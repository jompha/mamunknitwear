export const site = {
  name: 'Mamun Knitwear Ltd.',
  legalName: 'Mamun Knitwear Ltd.',
  tagline: '100% Export Oriented Knit Garments Manufacturer',
  description:
    'Mamun Knitwear Ltd. is a 100% export oriented knit garments manufacturer in Gazipur, Bangladesh, with knitting, printing, embroidery and sewing facilities.',
  url: import.meta.env.SITE ?? 'https://www.mamunknitwear.com',
  base: import.meta.env.BASE_URL,
  language: 'en',
  locale: 'en_US',
  owner: 'Md Mahfujur Rahman',
  ownerTitle: 'Manager, IT',
  ownerEmail: 'info@mmknitwear.com',
  publicEmail: 'info@mamunknitwear.com',
  phone: '+880 9666 791791',
  phoneRaw: '+8809666791791',
  phoneAlt: '+880 2 9298787',
  phoneAltRaw: '+88029298787',
  fax: '+880 9666768768',
  address: {
    line1: 'Aambag Road, Konabari',
    line2: 'Nilnagar, Gazipur',
    country: 'Bangladesh',
  },
  website: 'https://mamunknitwear.com',
  established: 2013,
  foundedText: 'January 2013',
  social: {
    facebook: 'https://www.facebook.com/mamunknitwearltd',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://twitter.com/',
  },
  profilePdf: '/files/Company-Profile-MKL.pdf',
  // Placeholder for the static contact form endpoint (see CONTACT.md / MIGRATION-NOTES.md).
  // Set to a configured form endpoint when one is supplied, or keep empty to
  // fall back to a mailto: link. Never commit secrets here.
  contactFormEndpoint: '',
  analytics: null, // intentionally disabled; the source site's UA-81405524-1 was removed
};

export type SiteConfig = typeof site;

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about-us/' },
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Knitting', href: '/knitting-section/' },
      { label: 'Digital Printing', href: '/digital-printing/' },
      { label: 'Sewing', href: '/sewing-section/' },
    ],
  },
  { label: 'News', href: '/news-2/' },
  { label: 'Contact us', href: '/contact-us/' },
];

export const sisterConcerns: { name: string; note?: string }[] = [
  { name: 'M.M. Knitwear Ltd.', note: '100% export oriented composite knit industry' },
  { name: 'M.M. Label Accessories Ltd.' },
  { name: 'M.M. Printing & M.M. Embroidery' },
  { name: 'M.M. Dyeing Unit 02' },
];
