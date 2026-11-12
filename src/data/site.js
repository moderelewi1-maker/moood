// Site-wide structure: navigation, contact details and profile links.

export const contact = {
  email: 'modarelewi86@gmail.com',
  // Portrait shown in the Contact section. Set to '' to hide it.
  portrait: '/assets/profile-hero.jpg',
}

// Profile links. An entry is only shown once its `href` is a real URL, so
// paste each address and the icon appears, e.g.
//   { id: 'linkedin', href: 'https://www.linkedin.com/in/your-handle' }
//   { id: 'whatsapp', href: 'https://wa.me/9639XXXXXXXX' }
export const socials = [
  { id: 'linkedin', href: '' },
  { id: 'github', href: '' },
  { id: 'whatsapp', href: '' },
]

// Primary navigation. `id` is the key of the label under `nav` in
// src/i18n/translations.js; `sections` lists the section ids that mark the
// link as active while they are on screen.
export const navLinks = [
  { id: 'work', href: '#work', sections: ['work', 'index'] },
  { id: 'results', href: '#results', sections: ['results'] },
  { id: 'capabilities', href: '#capabilities', sections: ['capabilities'] },
  { id: 'approach', href: '#approach', sections: ['approach'] },
  { id: 'contact', href: '#contact', sections: ['contact'] },
]
