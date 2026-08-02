import pepeJeans from '../assets/images/client-pepe-jeans.png';
import laHalle from '../assets/images/client-la-halle.png';
import sportsWorld from '../assets/images/client-sports-world.png';
import pierreCardin from '../assets/images/client-pierre-cardin.png';
import slazenger from '../assets/images/client-slazenger.png';
import bsci from '../assets/images/cert-bsci.png';
import intertek from '../assets/images/cert-intertek.png';
import sedex from '../assets/images/cert-sedex.png';
import oekoTex from '../assets/images/cert-oeko-tex.png';
import wrap from '../assets/images/cert-wrap.png';
import iso14001 from '../assets/images/cert-iso-14001.png';
import ohsas from '../assets/images/cert-ohsas.png';
import organic from '../assets/images/cert-organic.png';

export interface LogoItem {
  name: string;
  image: ImageMetadata;
  alt: string;
}

export const clients: LogoItem[] = [
  { name: 'Pepe Jeans', image: pepeJeans, alt: 'Pepe Jeans logo' },
  { name: 'La Halle', image: laHalle, alt: 'La Halle logo' },
  { name: 'Sports World', image: sportsWorld, alt: 'Sports World logo' },
  { name: 'Pierre Cardin', image: pierreCardin, alt: 'Pierre Cardin logo' },
  { name: 'Slazenger', image: slazenger, alt: 'Slazenger logo' },
];

export const certifications: LogoItem[] = [
  { name: 'BSCI', image: bsci, alt: 'BSCI certification logo' },
  { name: 'Intertek', image: intertek, alt: 'Intertek certification logo' },
  { name: 'Sedex', image: sedex, alt: 'Sedex certification logo' },
  { name: 'OEKO-TEX', image: oekoTex, alt: 'OEKO-TEX certification logo' },
  { name: 'WRAP', image: wrap, alt: 'WRAP certification logo' },
  { name: 'ISO 14001', image: iso14001, alt: 'ISO 14001 certification logo' },
  { name: 'OHSAS', image: ohsas, alt: 'OHSAS certification logo' },
  { name: 'Organic', image: organic, alt: 'Organic certification logo' },
];
