// Scroll choreography for the 3D instrument.
//
// Each page section carries a `data-scene="<key>"` attribute; while it is on
// screen the instrument eases toward that key's pose, and blends between
// neighbouring poses as one section hands over to the next.
//
//   wide / narrow  placement on landscape and portrait viewports
//     x, y         position as a fraction of the half-viewport (−1 … 1).
//                  x is mirrored automatically in right-to-left layouts.
//     scale        diameter as a fraction of the viewport's short side
//     presence     canvas opacity (0 … 1): how much it competes with content
//   rings          resting angle of each gimbal, outer → inner (radians)
//   tilt           orientation of the whole instrument [pitch, yaw]
//   drive          how strongly scrolling rocks the gimbals (0 = held still)
//
// The story it tells: the gimbals drift freely in the hero, step aside for
// each heading, stand behind the project plates as the reader travels through
// the work, lock into one flat plane at Capabilities (every function
// aligned), and open into a full sphere at Contact.
//
// Placement rule: wherever there is body text the instrument sits in a margin
// or behind an opaque surface, so it gives depth without costing legibility.
const HALF_PI = Math.PI / 2

export const POSES = {
  hero: {
    wide: { x: 0.5, y: 0.02, scale: 0.68, presence: 1 },
    narrow: { x: 0, y: 0.6, scale: 0.6, presence: 0.95 },
    rings: [0.35, 1.12, -0.82],
    tilt: [0.3, -0.5],
    drive: 1,
  },
  // Heading of Selected Work: cropped by the far edge, clear of the title.
  intro: {
    wide: { x: 1.02, y: 0.06, scale: 0.66, presence: 0.5 },
    narrow: { x: 1.05, y: 0.5, scale: 0.6, presence: 0.2 },
    rings: [0.9, 0.55, 1.3],
    tilt: [0.62, 0.42],
    drive: 1,
  },
  // Selected Work sequence: large, directly behind the plates, which hide
  // its centre — only the rings show around their edges.
  featured: {
    wide: { x: 0.38, y: -0.13, scale: 0.98, presence: 0.5 },
    narrow: { x: 0, y: 0.42, scale: 0.86, presence: 0.45 },
    rings: [0.5, 0.95, -0.6],
    tilt: [0.22, -0.3],
    drive: 1,
  },
  index: {
    wide: { x: 1.2, y: -0.1, scale: 0.52, presence: 0.3 },
    narrow: { x: 1.1, y: 0.1, scale: 0.9, presence: 0.14 },
    rings: [-0.4, 1.3, 0.5],
    tilt: [0.4, -0.7],
    drive: 1,
  },
  // All three gimbals in one plane, seen at an angle, in the margin column.
  capabilities: {
    wide: { x: -0.73, y: -0.44, scale: 0.46, presence: 0.62 },
    narrow: { x: 1.1, y: 0.5, scale: 0.9, presence: 0.14 },
    rings: [0, 0, 0],
    tilt: [1.02, -0.22],
    drive: 0,
  },
  approach: {
    wide: { x: -1.2, y: -0.46, scale: 0.52, presence: 0.3 },
    narrow: { x: 1.15, y: -0.3, scale: 0.9, presence: 0.12 },
    rings: [0, 0.62, 1.18],
    tilt: [0.5, 0.5],
    drive: 0.7,
  },
  contact: {
    wide: { x: 0.56, y: 0, scale: 0.7, presence: 0.9 },
    narrow: { x: 0.8, y: 0.64, scale: 0.76, presence: 0.2 },
    rings: [0, HALF_PI, HALF_PI],
    tilt: [0.26, 0.62],
    drive: 0.3,
  },
}

export const POSE_SIZE = 10

/** Flattens a pose into a numeric array so it can be interpolated in place. */
export function writePose(key, layout, out) {
  const pose = POSES[key]
  const place = pose[layout]
  out[0] = place.x
  out[1] = place.y
  out[2] = place.scale
  out[3] = place.presence
  out[4] = pose.rings[0]
  out[5] = pose.rings[1]
  out[6] = pose.rings[2]
  out[7] = pose.tilt[0]
  out[8] = pose.tilt[1]
  out[9] = pose.drive
  return out
}
