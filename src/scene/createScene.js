import {
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Timer,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { POSES, POSE_SIZE, writePose } from './poses.js'

const { damp, lerp, smootherstep } = MathUtils

const CAMERA_Z = 6
const FOV = 35
const HALF_HEIGHT = Math.tan(MathUtils.degToRad(FOV / 2)) * CAMERA_Z // world units at the instrument's depth
const OUTER_RADIUS = 1.5

// Dust motes: a sparse field at mixed depths. They share the page's scroll,
// so near ones cross the screen faster than far ones — the parallax is what
// makes the page read as a space the reader is travelling through.
const DUST_VERTEX = /* glsl */ `
  uniform float uScroll;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSpan;
  attribute float aSize;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    p.y = mod(p.y + uScroll + uSpan * 0.5, uSpan) - uSpan * 0.5;
    p.x += sin(uTime * 0.06 + aSeed * 6.2831) * 0.1;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (7.0 / depth);
    float edge = smoothstep(uSpan * 0.5, uSpan * 0.5 - 1.2, abs(p.y));
    vAlpha = smoothstep(15.0, 6.0, depth) * smoothstep(1.2, 3.0, depth) * edge * (0.45 + 0.55 * aSeed);
  }
`

const DUST_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

function buildDust(count) {
  const span = 12
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)
  // Deterministic pseudo-random layout, so the field is identical on every visit.
  let s = 7
  const rand = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 15
    positions[i * 3 + 1] = (rand() - 0.5) * span
    positions[i * 3 + 2] = -7 + rand() * 10.5
    sizes[i] = 1.2 + rand() * 2.2
    seeds[i] = rand()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
  const material = new ShaderMaterial({
    vertexShader: DUST_VERTEX,
    fragmentShader: DUST_FRAGMENT,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uScroll: { value: 0 },
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSpan: { value: span },
      uColor: { value: new Color(0xece8e0) },
    },
  })
  const points = new Points(geometry, material)
  points.frustumCulled = false
  return points
}

/**
 * The instrument: three nested brass gimbals around a dark rotor, built like
 * a real gyroscope — each ring pivots on pins set in the ring outside it, at
 * right angles to the last. Physically based materials lit by a studio
 * environment give the metal its reflections; there are no textures to load.
 */
function buildInstrument() {
  const disposables = []
  const track = (item) => {
    disposables.push(item)
    return item
  }

  const brass = track(new MeshStandardMaterial({ color: 0xcfb27c, metalness: 1, roughness: 0.24 }))
  const rotorMaterial = track(
    new MeshPhysicalMaterial({
      color: 0x0d0e11,
      metalness: 0.9,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
  )

  const ring = (radius, tube) => {
    const mesh = new Mesh(track(new TorusGeometry(radius, tube, 28, 256)), brass)
    mesh.scale.z = 0.52 // flattens the section into a band rather than a wire
    return mesh
  }
  const pinGeometry = track(new CylinderGeometry(0.013, 0.013, 1, 16))
  const bearingGeometry = track(new SphereGeometry(0.04, 24, 16))

  // Pivot pins (with bearings) bridging two rings along one axis.
  const pivots = (parent, axis, inner, outer) => {
    for (const side of [-1, 1]) {
      const pin = new Mesh(pinGeometry, brass)
      const bearing = new Mesh(bearingGeometry, brass)
      const mid = (side * (inner + outer)) / 2
      pin.scale.y = outer - inner
      if (axis === 'x') {
        pin.rotation.z = Math.PI / 2
        pin.position.x = mid
        bearing.position.x = side * outer
      } else {
        pin.position.y = mid
        bearing.position.y = side * outer
      }
      parent.add(pin, bearing)
    }
  }

  const radii = [OUTER_RADIUS, 1.2, 0.92]

  const root = new Group()
  const outer = new Group()
  const middle = new Group()
  const inner = new Group()
  const rotor = new Group()

  outer.add(ring(radii[0], 0.036))
  pivots(outer, 'x', radii[1], radii[0])

  middle.add(ring(radii[1], 0.03))
  pivots(middle, 'y', radii[2], radii[1])

  inner.add(ring(radii[2], 0.026))
  const axle = new Mesh(pinGeometry, brass)
  axle.rotation.z = Math.PI / 2
  axle.scale.y = radii[2] * 2
  inner.add(axle)

  rotor.add(new Mesh(track(new SphereGeometry(0.36, 96, 64)), rotorMaterial))
  const band = new Mesh(track(new TorusGeometry(0.364, 0.011, 16, 160)), brass)
  band.rotation.set(0, Math.PI / 2, 0.32) // off-axis, so the spin is visible
  rotor.add(band)

  inner.add(rotor)
  middle.add(inner)
  outer.add(middle)
  root.add(outer)

  return { root, outer, middle, inner, rotor, dispose: () => disposables.forEach((item) => item.dispose()) }
}

/**
 * Mounts the scene in `container` and runs it until `dispose()` is called.
 * Reads scroll position, viewport and text direction straight from the DOM,
 * so it needs no props and stays in sync with Lenis automatically.
 */
export function createScene({ container, reducedMotion = false }) {
  let renderer
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return { dispose() {} } // no WebGL: the page simply renders without the instrument
  }

  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = NeutralToneMapping
  renderer.toneMappingExposure = 1.05

  const canvas = renderer.domElement
  canvas.style.cssText = 'display:block;width:100%;height:100%;opacity:0'
  container.appendChild(canvas)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 60)
  camera.position.set(0, 0, CAMERA_Z)

  const pmrem = new PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const environment = pmrem.fromScene(room, 0.03)
  scene.environment = environment.texture
  scene.environmentIntensity = 1.1
  room.dispose()
  pmrem.dispose()

  const key = new DirectionalLight(0xfff2de, 2.4)
  key.position.set(3.5, 4.5, 5)
  const fill = new DirectionalLight(0xdfe6f2, 0.9)
  fill.position.set(-4, -2.5, 3)
  scene.add(key, fill)

  const instrument = buildInstrument()
  scene.add(instrument.root)

  const dust = buildDust(120)
  scene.add(dust)

  // ── viewport ────────────────────────────────────────────────────────────
  let width = 1
  let height = 1
  let halfWidth = HALF_HEIGHT
  let layout = 'wide'
  let quality = 1 // render-resolution multiplier, lowered on slow devices

  function resize() {
    const rect = container.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const aspect = rect.width / rect.height
    const nextLayout = aspect < 0.85 ? 'narrow' : 'wide'
    const pixelRatio = Math.min(window.devicePixelRatio || 1, nextLayout === 'narrow' ? 1.75 : 2) * quality
    // Resizing clears the canvas, so skip it when nothing actually changed.
    if (rect.width === width && rect.height === height && pixelRatio === renderer.getPixelRatio()) return
    width = rect.width
    height = rect.height
    layout = nextLayout
    halfWidth = HALF_HEIGHT * aspect
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width, height, false)
    dust.material.uniforms.uPixelRatio.value = pixelRatio
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }

  // ── sections ────────────────────────────────────────────────────────────
  let sections = []

  function measure() {
    const scrollY = window.scrollY
    sections = Array.from(document.querySelectorAll('[data-scene]'))
      .filter((element) => POSES[element.dataset.scene])
      .map((element) => ({
        key: element.dataset.scene,
        top: element.getBoundingClientRect().top + scrollY,
      }))
      .sort((a, b) => a.top - b.top)
  }

  const target = new Float32Array(POSE_SIZE)
  const current = new Float32Array(POSE_SIZE)
  const scratch = new Float32Array(POSE_SIZE)

  // Folds the section poses together: each section fades its pose in over the
  // stretch of scroll in which its top edge rises through the viewport.
  function sampleTarget(scrollY, viewport) {
    if (sections.length === 0) return writePose('hero', layout, target)
    writePose(sections[0].key, layout, target)
    const bottom = scrollY + viewport
    for (let i = 1; i < sections.length; i++) {
      const weight = smootherstep((bottom - sections[i].top) / (viewport * 0.7), 0, 1)
      if (weight <= 0) break
      writePose(sections[i].key, layout, scratch)
      for (let k = 0; k < POSE_SIZE; k++) target[k] = lerp(target[k], scratch[k], weight)
    }
    return target
  }

  // ── frame ───────────────────────────────────────────────────────────────
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
  let lastScroll = window.scrollY
  let velocity = 0
  let spin = 0
  let intro = 0
  let primed = false

  function update(dt, time) {
    const viewport = window.innerHeight || height
    const scrollY = window.scrollY
    const direction = document.documentElement.dir === 'rtl' ? -1 : 1

    sampleTarget(scrollY, viewport)
    if (!primed) {
      current.set(target)
      primed = true
    } else {
      for (let k = 0; k < POSE_SIZE; k++) current[k] = damp(current[k], target[k], k < 4 ? 3.2 : 2.6, dt)
    }

    // Scroll speed in viewports per second, smoothed — it feeds the rotor.
    velocity = damp(velocity, (scrollY - lastScroll) / Math.max(dt, 0.001) / viewport, 5, dt)
    lastScroll = scrollY
    pointer.x = damp(pointer.x, pointer.targetX, 2.4, dt)
    pointer.y = damp(pointer.y, pointer.targetY, 2.4, dt)

    const [x, y, scale, presence, r1, r2, r3, pitch, yaw, drive] = current
    const travel = scrollY / viewport // distance scrolled, in viewports
    const shortSide = Math.min(HALF_HEIGHT, halfWidth)

    const { root, outer, middle, inner, rotor } = instrument
    root.position.set(direction * x * halfWidth, y * HALF_HEIGHT, 0)
    root.scale.setScalar((scale * shortSide) / OUTER_RADIUS)
    root.rotation.x = pitch + pointer.y * 0.1
    root.rotation.y = direction * yaw + pointer.x * 0.16 + Math.sin(time * 0.11) * 0.05

    // Each gimbal answers the scroll at its own rate (the "drive"), plus a
    // slow drift so the instrument is never perfectly still.
    outer.rotation.y = r1 + drive * Math.sin(travel * 0.85) * 0.55 + Math.sin(time * 0.13) * 0.04
    middle.rotation.x = r2 + drive * Math.sin(travel * 1.25 + 1.1) * 0.75 + Math.sin(time * 0.19 + 1.7) * 0.05 * drive
    inner.rotation.y = r3 + drive * Math.sin(travel * 1.7 + 2.3) * 0.95 + Math.sin(time * 0.16 + 0.6) * 0.06 * drive

    // The rotor idles, and spins up with the speed of the scroll.
    spin += (0.4 + Math.min(Math.abs(velocity), 5) * 2.2) * dt
    rotor.rotation.x = spin

    camera.position.x = pointer.x * 0.14
    camera.position.y = -pointer.y * 0.09
    camera.lookAt(0, 0, 0)

    dust.material.uniforms.uScroll.value = travel * 1.5
    dust.material.uniforms.uTime.value = time

    intro = Math.min(1, intro + dt / 1.6)
    canvas.style.opacity = String(presence * intro * intro * (3 - 2 * intro))
  }

  const timer = new Timer()
  let frameId = 0
  let sampledTime = 0
  let sampledFrames = 0

  // Keeps motion smooth on weak GPUs: if the device cannot hold roughly
  // 40 fps, the render resolution steps down (never back up, to avoid
  // flip-flopping). The geometry is unchanged, so only sharpness is traded.
  function adaptQuality(delta) {
    if (delta > 0.25) return // tab was in the background; not a real frame time
    sampledTime += delta
    sampledFrames += 1
    if (sampledFrames < 50) return
    const average = sampledTime / sampledFrames
    sampledTime = 0
    sampledFrames = 0
    if (average > 1 / 40 && quality > 0.6) {
      quality = Math.max(0.6, quality - 0.2)
      resize()
    }
  }

  function frame(timestamp) {
    frameId = requestAnimationFrame(frame)
    if (document.hidden) return
    timer.update(timestamp)
    const delta = timer.getDelta()
    if (intro >= 1) adaptQuality(delta)
    update(Math.min(delta, 0.05), timer.getElapsed())
    renderer.render(scene, camera)
  }

  function renderStill() {
    intro = 1
    primed = false
    update(0.016, 0)
    renderer.render(scene, camera)
  }

  // ── wiring ──────────────────────────────────────────────────────────────
  function handlePointer(event) {
    if (event.pointerType !== 'mouse') return
    pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1
    pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1
  }

  function handleLayoutChange() {
    resize()
    measure()
    if (reducedMotion) renderStill()
  }

  const observer = new ResizeObserver(handleLayoutChange)
  observer.observe(container)
  observer.observe(document.body) // page height changes (filters, fonts) move the sections
  window.addEventListener('resize', handleLayoutChange)

  resize()
  measure()

  if (reducedMotion) {
    renderStill()
  } else {
    window.addEventListener('pointermove', handlePointer, { passive: true })
    frameId = requestAnimationFrame(frame)
  }

  return {
    dispose() {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', handleLayoutChange)
      window.removeEventListener('pointermove', handlePointer)
      instrument.dispose()
      dust.geometry.dispose()
      dust.material.dispose()
      environment.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
