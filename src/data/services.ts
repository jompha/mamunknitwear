import svcKnitting2 from '../assets/images/knitting-04.jpg';
import svcSample from '../assets/images/svc-sample.jpg';
import svcCutting from '../assets/images/cutting-section.jpg';
import svcSewing2 from '../assets/images/sewing-02.jpg';
import svcSewing3 from '../assets/images/sewing-03.jpg';
import svcEmbroidery from '../assets/images/svc-embroidery.jpg';
import { withBase } from '../utils/paths';

export interface Service {
  title: string;
  summary: string;
  image: ImageMetadata;
  imageAlt: string;
  href: string;
}

export const services: Service[] = [
  {
    title: 'Knitting Section',
    summary:
      'We are among the best knitting industries of Bangladesh and manufacture the best quality garments for our clients.',
    image: svcKnitting2,
    imageAlt: 'Knitting machines producing fabric at Mamun Knitwear Ltd.',
    href: withBase('/knitting-section/'),
  },
  {
    title: 'Sample Section',
    summary:
      'Highly skilled and experienced master tailors in the sample section ensure reproduction of the approved samples in toto.',
    image: svcSample,
    imageAlt: 'Sample section of Mamun Knitwear Ltd.',
    href: withBase('/services/'),
  },
  {
    title: 'Cutting Section',
    summary:
      'Highly sophisticated cutting room solutions ensure precision and accuracy in cutting – minimizing wastage of fabric and man hours.',
    image: svcCutting,
    imageAlt: 'Cutting section of Mamun Knitwear Ltd.',
    href: withBase('/services/'),
  },
  {
    title: 'Sewing Section',
    summary:
      'Our large garments unit with 18 production lines delivers best quality finished garments for our clients.',
    image: svcSewing2,
    imageAlt: 'Garments in production at the sewing unit of Mamun Knitwear Ltd.',
    href: withBase('/sewing-section/'),
  },
  {
    title: 'Finishing Section',
    summary:
      'One of the best finishing sections in Bangladesh, ensuring spotless finishing of every garment.',
    image: svcSewing3,
    imageAlt: 'Finished garments at the finishing section of Mamun Knitwear Ltd.',
    href: withBase('/services/'),
  },
  {
    title: 'Embroidery',
    summary: 'Large embroidery facility with automated machines is coming soon.',
    image: svcEmbroidery,
    imageAlt: 'Embroidery machines at Mamun Knitwear Ltd.',
    href: withBase('/services/'),
  },
];
