export const COMPANY = {
  name: 'deGraauw Electric, LLC',
  shortName: 'deGraauw Electric',
  phone: '615-637-9966',
  phoneHref: 'tel:+16156379966',
  email: 'info@degraauwelectric.pro',
  website: 'https://degraauwelectric.pro',
  address: {
    street: '401 Commerce St.',
    suite: 'Suite 5400',
    city: 'Nashville',
    state: 'TN',
    zip: '37219',
    country: 'United States',
  },
  hours: [
    { days: 'Monday – Friday', time: '7:00 AM – 3:30 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  founded: 2016,
  linkedin: 'https://www.linkedin.com/company/degraauw-electric',
  states: ['Tennessee', 'Mississippi', 'North Carolina', 'Florida', 'Colorado'],
};

export const SITE_URL = 'https://degraauwelectric.pro';

export interface Service {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  bullets: string[];
  detail: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'commercial-electrical',
    path: '/services/commercial-electrical',
    title: 'Commercial Electrical Services',
    shortTitle: 'Commercial',
    tagline: 'Powering Nashville businesses, from office build-outs to retail centers.',
    description:
      'From ground-up construction to tenant improvements, our commercial electricians deliver budgeting, planning, documentation, self-performed installation, testing, and coordination — on time and on budget.',
    image: '/commercial.webp',
    bullets: [
      'Ground-up commercial construction',
      'Tenant improvements & build-outs',
      'Lighting design and installation',
      'Electrical maintenance and repair',
      'Emergency electrical service',
    ],
    detail: [
      'Commercial projects live and die by schedule and budget. Our team supports projects from preconstruction through closeout: budgeting, planning, documentation, self-performed electrical installation, testing, and coordination.',
      'With nearly a decade of experience serving Nashville and Middle Tennessee, we understand what general contractors, developers, and business owners need from their electrical partner — clear communication, skilled craftsmanship, and zero surprises.',
      'Whether it is a single-story office building, a retail center, or a multi-tenant facility, we bring the same standard to every project: skilled craftsmanship and impeccable performance.',
    ],
  },
  {
    slug: 'industrial-electrical',
    path: '/services/industrial-electrical',
    title: 'Industrial & Manufacturing Electrical Solutions',
    shortTitle: 'Industrial & Manufacturing',
    tagline: 'Keeping production lines running across the Southeast.',
    description:
      'Manufacturing facilities demand electrical systems that run continuously and safely. We provide industrial electrical installation, maintenance, and repair built for demanding production environments.',
    image: '/industrial.webp',
    bullets: [
      'Industrial power distribution',
      'Manufacturing facility electrical installation',
      'Electrical maintenance programs',
      'Equipment hookups and retrofits',
      'Troubleshooting and emergency response',
    ],
    detail: [
      'In a manufacturing environment, downtime is the enemy. Our industrial electricians design, install, and maintain power systems built for continuous operation — from service entrances and distribution gear to machine hookups and lighting.',
      'We work around production schedules, coordinating shutdowns and phased work to keep your lines moving. Our teams are experienced with the coordination, documentation, and safety culture that industrial facilities require.',
      'As regional leaders in industrial electrical contracting and integration, we support facilities across Tennessee and the broader Southeast.',
    ],
  },
  {
    slug: 'controls-equipment-installation',
    path: '/services/controls-equipment-installation',
    title: 'Industrial, Controls & Equipment Installation',
    shortTitle: 'Controls & Equipment',
    tagline: 'Precision installation of controls, gear, and production equipment.',
    description:
      'Our teams install and integrate electrical controls and production equipment with the precision that industrial operations require — from control panels and motor circuits to complete equipment setting and commissioning.',
    image: '/craftsmanship.webp',
    bullets: [
      'Control panel installation and wiring',
      'Motor and machine circuits',
      'Production equipment setting and hookup',
      'Equipment commissioning and testing',
      'Integration with existing plant systems',
    ],
    detail: [
      'Controls and equipment installation is where craftsmanship shows. Terminations, labeling, wire management, and testing are done right the first time — because rework in a production environment is never acceptable.',
      'We install control panels, motor circuits, and production equipment for manufacturers across the region, and we coordinate directly with equipment vendors and plant engineering teams to hit schedule dates.',
      'Every installation is documented and tested before handoff, so your maintenance team starts with a system they can trust and service.',
    ],
  },
  {
    slug: 'mission-critical-power',
    path: '/services/mission-critical-power',
    title: 'Mission Critical Power',
    shortTitle: 'Mission Critical',
    tagline: 'Zero-downtime power for facilities that cannot fail.',
    description:
      'Data centers, healthcare, and facilities that cannot tolerate an outage trust deGraauw Electric for redundant power systems, backup generation, and uncompromising installation standards.',
    image: '/mission-critical.webp',
    bullets: [
      'Backup generator and transfer switch systems',
      'Uninterruptible power supply (UPS) integration',
      'Redundant power distribution',
      'Data center and healthcare electrical systems',
      'Preventive maintenance and testing',
    ],
    detail: [
      'Some facilities measure downtime in lost revenue per minute. Our mission critical work focuses on redundancy, clean installation, and rigorous testing — so the power stays on no matter what.',
      'We install backup generation, automatic transfer switches, UPS systems, and redundant distribution paths for data centers, healthcare facilities, and other operations where continuity is everything.',
      'Every mission critical installation is verified end to end, with documentation and testing that your facility team can rely on during a real event.',
    ],
  },
];

export interface Project {
  name: string;
  location: string;
  category: 'Commercial' | 'Industrial';
  description: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'DR Horton Offices',
    location: 'Smyrna, TN',
    category: 'Commercial',
    description:
      'Ground up, 21,679 sq. ft. single story office building to serve as DR Horton\u2019s Nashville division office.',
  },
  {
    name: 'ARCO National Construction Project',
    location: 'Nashville, TN',
    category: 'Commercial',
    description:
      'A successful commercial project completed in partnership with ARCO National Construction Company.',
  },
  {
    name: 'Nashville Commercial Build-Outs',
    location: 'Nashville, TN',
    category: 'Commercial',
    description:
      'Tenant improvements and electrical build-outs for commercial clients across the Nashville metro area.',
  },
  {
    name: 'Regional Manufacturing Facility Work',
    location: 'Middle Tennessee',
    category: 'Industrial',
    description:
      'Industrial electrical installation and equipment work supporting manufacturing operations in Middle Tennessee.',
  },
];

export const DIFFERENCE = [
  {
    title: 'Licensed in Multiple Regions',
    text: 'We provide excellent contracting and extend our services to businesses across Tennessee, Mississippi, North Carolina, Florida, and Colorado.',
  },
  {
    title: '100% Satisfaction Guarantee',
    text: 'Our flawless execution of projects begins in the planning and budgeting stages and continues through closeout.',
  },
  {
    title: 'Over a Decade of Experience',
    text: 'We\u2019re a regional leader in our industry because we provide skilled craftsmanship and impeccable performance on every project.',
  },
];

export const LEADERSHIP = [
  {
    name: 'Justin deGraauw',
    role: 'Co-Founder & Leadership',
    image: '/justin-degraauw.jpg',
  },
  {
    name: 'Jeff deGraauw',
    role: 'Co-Founder & Leadership',
    image: '/jeff-degraauw.jpg',
  },
  {
    name: 'Jared deGraauw',
    role: 'Co-Founder & Leadership',
    image: '/jared-degraauw.jpg',
  },
];
