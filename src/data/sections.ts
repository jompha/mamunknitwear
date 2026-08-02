export interface Stat {
  label: string;
  value: string;
}

export interface KnittingMachineRow {
  sl: string;
  machine: string;
  dia: string;
  gauge: string;
  origin: string;
  nos: string;
}

export const knitting = {
  slug: 'knitting-section',
  title: 'Knitting Section',
  intro:
    'We are among the best knitting industries of Bangladesh and manufacture the best quality garments for our clients. Over the years our quality products and reputation have created a strong business relation with the world’s famous clothing brands.',
  units: [
    {
      title: 'Circular Knitting Unit:',
      text: 'We have a large circular knitting unit having 110 machines with 20GG, 24GG, 28GG cylinder and optimum attachment to produce all types of weft knitted fabric. Machines are Fukuhara, Fukuhama and Jiunn Long branded. We also have 28 machines with open width take down and 05 engineering striper machine. List of machines with diameter as below:',
    },
    {
      title: 'Flat Knitting Unit:',
      text: 'We have computerized flat knit machines branded around star, kauo heng, Jy lee having jaquarded option to produce different types of collar, cuff and bottoms.',
    },
    {
      title: 'Narrow Fabric Unit:',
      text: 'We have a narrow fabric unit to produce better quality accessories of garments like twill tape, dusting etc.',
    },
    {
      title: 'Quality Control Unit:',
      text: 'We have a well-equipped quality control unit to produce the best quality for our customers.',
    },
  ],
  machineTable: {
    caption: 'Circular knitting machines (diameter and gauge)',
    head: ['Sl.', 'Machine', 'Dia', 'Guage', 'Origin', 'Nos.'],
    rows: [
      { sl: '1', machine: 'S/J', dia: '32”', gauge: '24/28', origin: 'Taiwan', nos: '01' },
      { sl: '2', machine: 'S/J', dia: '34”', gauge: '24', origin: 'Taiwan', nos: '03' },
      { sl: '3', machine: 'S/J', dia: '36”', gauge: '24/28', origin: 'Taiwan', nos: '04' },
      { sl: '4', machine: 'S/J', dia: '38”', gauge: '24', origin: 'Taiwan', nos: '04' },
      { sl: '5', machine: 'S/J', dia: '40”', gauge: '24', origin: 'Taiwan', nos: '03' },
      { sl: '6', machine: 'S/J', dia: '42”', gauge: '24', origin: 'Taiwan', nos: '01' },
      { sl: '', machine: 'Total', dia: '', gauge: '', origin: '', nos: '28' },
    ],
  },
  summary: [
    { label: 'Total Machine', value: '28 Sets' },
    { label: 'Floor Space', value: '23,231 S.Ft' },
    { label: 'Total Capacity', value: '10,000 Kgs/Day' },
    { label: 'Manpower', value: '60 Personnel' },
  ] as Stat[],
};

export const digitalPrinting = {
  slug: 'digital-printing',
  title: 'Digital Printing',
  intro:
    'Equipped with latest and greatest automatic printing machines from M&R, our highly skilled and experienced printing experts are destined for the best quality ever possible.',
  details:
    'We use the latest technology and environment friendly production process to deliver the best quality to our clients.',
  facts: [
    { label: 'Floor Space', value: '11,000 sq. feet' },
    { label: 'Machinery', value: '4 sets of latest model M&R auto digital printing machines' },
    {
      label: 'Manpower',
      value:
        'Highly skilled 40 personnel with expert knowledge and experience are working for the printing section',
    },
  ],
  mission:
    'Our mission is to develop and provide the best quality digital printing services to our buyers.',
};

export const sewing = {
  slug: 'sewing-section',
  title: 'Sewing Section',
  intro:
    'We have a large garments unit which has 18 production lines having 23,000 sq. ft. of floor space. Our independent quality team is working to ensure customer’s required quality standard. Factory regular AQL system is 2.5 but in certain cases it depends on customer requirement.',
  details:
    'We use the latest technology and environment friendly production process to deliver the best quality to our clients.',
  units: [
    {
      title: 'Sample Section',
      text: 'Floor space: 2,500 sq. feet (5th floor). Machineries: 25 machines + 1 cutting table, inspection table + 1 pattern table. Manpower: 20 personnel working under the sample technician, separate pattern master, Q.C, cutting man, sample machinist.',
    },
    {
      title: 'Cutting Section',
      text: 'Cutting table: 05 cutting tables of (70 feet each) in 5th floor. Floor space: 23,231 sq. feet. Total capacity: 45,000 pcs/day (average). Manpower: 95 personnel.',
    },
    {
      title: 'Sewing Section',
      text: 'Total sewing lines: 18 lines. 2nd & 4th floor. Floor space: 22,762 sq. feet. Total capacity: 25,000 pcs/day (average). Manpower: 786 personnel.',
    },
    {
      title: 'Finishing Section',
      text: 'Three separate floors. Floor space: 23,700 sq. feet, 2nd & 4th floor. Total capacity: 25,000 pcs/day (average). Manpower: 198 personnel. Others: 117.',
    },
  ],
  summary: [
    { label: 'Total Lines', value: '18 Lines' },
    { label: 'Total Machines', value: '843 Nos.' },
    { label: 'Total Floor Space', value: '72,193 S.Ft' },
    { label: 'Total Capacity', value: '25,000 Pcs/Day (Avg)' },
    { label: 'Manpower', value: '1266 Personnel' },
  ] as Stat[],
};

export const aboutText = {
  intro: [
    'Mamun Knitwear Ltd. is a 100% export oriented knit garments factory which is a sister concern of M.M. Knitwear Ltd., 100% export oriented composite knit industry having Knitting, Dyeing, Printing, Embroidery and Garments.',
    'Mamun Knitwear Ltd. has been established in 2013 and producing best quality knitted items. It is housed in its own building surrounding an area of 2,00,000 sq. ft. Mamun Knitwear Ltd. employed experienced staff and workers who are expert to produce good quality product in time.',
    'Mamun Knitwear Ltd. expects to become one of the most leading manufacturers in exporting readymade garments in the international market by its own efficiency.',
  ],
};
