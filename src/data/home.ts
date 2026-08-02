export interface Service {
  title: string;
  slug: string;
  summary: string;
  image: ImageMetadata;
  imageAlt: string;
  href: string;
}

export interface Feature {
  title: string;
  summary: string;
  icon: string;
  href: string;
}

export interface LogoItem {
  name: string;
  image: ImageMetadata;
  alt: string;
}

export const homeFeatures: Feature[] = [
  {
    title: 'Quality',
    summary:
      'Quality is our highest priority with spot on deadlines. Our product quality is assured in every step of our production process – from samples till packaging for shipment.',
    icon: 'chart',
    href: '/services/',
  },
  {
    title: 'Environment Consciousness',
    summary:
      'Our factory is 100% environment friendly with full time ETP to process all the junks.',
    icon: 'tree',
    href: '/about-us-2/',
  },
  {
    title: 'Commitment',
    summary:
      'We always keep our commitment. We are always conscious about what promises we make and what we are capable of. You will always get the best services.',
    icon: 'thumbs-up',
    href: '/services/',
  },
  {
    title: 'Dependability',
    summary:
      'Maintenance of our products is critical for long lasting quality. Choose the right partner.',
    icon: 'briefcase',
    href: '/about-us-2/',
  },
  {
    title: 'Buyer Satisfaction',
    summary:
      '“People will forget what you said, people will forget what you did, but people will never forget how you made them feel.” – Maya Angelou',
    icon: 'thumbs-up',
    href: '/services/',
  },
  {
    title: 'Social Responsibility',
    summary:
      'First aid and medical assistance provided for free. Govt. labor law and BGMEA rules are strictly followed.',
    icon: 'medkit',
    href: '/about-us-2/',
  },
];

export interface HistoryMilestone {
  year: string;
  title: string;
  text: string;
}

export const historyMilestones: HistoryMilestone[] = [
  {
    year: '2013',
    title: 'Humble beginnings',
    text: 'We started our company back in January 2013.',
  },
  {
    year: '2016',
    title: 'A big turnover',
    text: 'Last year we achieved about 20 Million USD of yearly turnover. And this year we also achieved most of the prestigious certifications about compliance and audit.',
  },
  {
    year: '2019',
    title: 'Turnover milestone reached',
    text: 'Last years we achieved about 20 Million USD of yearly turnover. And this year we are also targeting a big turnover of 25 Million USD.',
  },
];
