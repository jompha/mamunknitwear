export interface FaqItem {
  question: string;
  answer: string;
}

// Grounded in the site's factual content (see EDITING-GUIDE.md). Answers stay
// under ~50 words so they are extractable by search and AI answer engines.
export const faqItems: FaqItem[] = [
  {
    question: 'Where is Mamun Knitwear Ltd. located?',
    answer:
      'Mamun Knitwear Ltd. is located on Aambag Road, Konabari, Nilnagar, Gazipur, Bangladesh. The factory operates from its own building covering 2,00,000 sq. ft.',
  },
  {
    question: 'Is Mamun Knitwear a 100% export oriented company?',
    answer:
      'Yes. Mamun Knitwear Ltd. is a 100% export oriented knit garments manufacturer, producing knitwear for international buyers since 2013.',
  },
  {
    question: 'What services does Mamun Knitwear provide?',
    answer:
      'Mamun Knitwear provides knitting, sample, cutting, sewing, finishing and embroidery services in its own integrated factory in Gazipur, Bangladesh.',
  },
  {
    question: 'How many sewing machines does Mamun Knitwear operate?',
    answer:
      'Mamun Knitwear Ltd. operates 18 sewing lines with 843 sewing machines across its production floor, supported by dedicated finishing and quality control units.',
  },
  {
    question: 'How many knitting machines does Mamun Knitwear have?',
    answer:
      'Mamun Knitwear operates a large circular knitting unit with 110 knitting machines, plus flat knit, narrow fabric and quality control units.',
  },
  {
    question: 'When was Mamun Knitwear established?',
    answer:
      'Mamun Knitwear Ltd. was established in January 2013 and has been producing export quality knitted items in Gazipur, Bangladesh ever since.',
  },
  {
    question: 'How can I contact Mamun Knitwear?',
    answer:
      'You can reach Mamun Knitwear Ltd. by phone at +880 9666 791791 or by email at info@mamunknitwear.com. A contact form is available on the Contact Us page.',
  },
];
