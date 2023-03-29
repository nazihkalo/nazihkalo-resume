import {
  AcademicCapIcon,
  CalendarIcon,
  DownloadIcon,
  FlagIcon,
  MapIcon,
  OfficeBuildingIcon,
  SparklesIcon,
} from '@heroicons/react/outline';

import DuneIcon from '../components/Icon/DuneIcon';
import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import TwitterIcon from '../components/Icon/TwitterIcon';
import heroImage2 from '../images/backgrounds/data_pipeline.png';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'React Resume Template',
  description: "Example site built with Tim Baker's react resume template",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage2,
  name: `Hi 👋 I'm Nazih Kalo.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a San Francisco based <strong className="text-stone-100">Data Scientist / Engineer</strong>, currently working
        at <strong className="text-stone-100">CyberConnect</strong> helping build decentralized social tooling for the future
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, you can catch me training in <strong className="text-stone-100">Muay Thai</strong>,
        plucking my <strong className="text-stone-100">banjo</strong>, or exploring beautiful{' '}
        <strong className="text-stone-100">Vancouver Island</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: DownloadIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `From the wild world of crypto to the dynamic domain of data science, 
  my passion for exploring the cutting edge has led me down an exciting path of discovery. 
  I've worked across multiple layers of the data stack; as a data scientist, data engineer, product analyst and a bit of frontend development.
  I enjoy exploring the power of AI, macro & behavioral economics, and incentive models to uncover insights that can help the companies I work with thrive. 
  Whether I'm building data pipelines or developing machine learning models, 
  I always keep an eye on the latest trends in the world of crypto and web3. 
  When I'm not busy tinkering with data, I'm usually immersing myself in educational YouTube channels
  on obscure topics or soaking up the vibrant Bay Area culture. 
  With over half a decade of experience under my belt, I'm eager to take on new challenges and continue 
  pushing the boundaries of what's possible with data.`,
  aboutItems: [
    {label: 'Location', text: 'San Francisco, USA', Icon: MapIcon},
    {label: 'Age', text: '27', Icon: CalendarIcon},
    {label: 'Nationality', text: 'French / Lebanese', Icon: FlagIcon},
    {label: 'Interests', text: 'Health, Macro Economics, ZKML', Icon: SparklesIcon},
    {label: 'Study', text: 'University of California Berkeley / UChicago', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'CyberConnect', Icon: OfficeBuildingIcon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'French',
        level: 5,
      },
      {
        name: 'Arabic',
        level: 4,
      },
    ],
  },
  {
    name: 'Data Engineering',
    skills: [
      {
        name: 'SQL',
        level: 10,
      },
      {
        name: 'Python',
        level: 9,
      },
      {
        name: 'Spark',
        level: 8,
      },
    ],
  },
  {
    name: 'Data Science / ML',
    skills: [
      {
        name: 'NLP',
        level: 8,
      },
      {
        name: 'Parametric Models',
        level: 7,
      },
      {
        name: 'Computer Vision',
        level: 4,
      },
    ],
  },
  {
    name: 'Cloud / Platforms',
    skills: [
      {
        name: 'AWS',
        level: 8,
      },
      {
        name: 'GCP',
        level: 6,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 6,
      },
      {
        name: 'Golang',
        level: 4,
      },
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Typescript',
        level: 7,
      },
      {
        name: 'GraphQL',
        level: 6,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'NFT Recommendation Engine',
    section: "crypto",
    description: 'A recommendation engine built using NFT trading history data & collobrative filtering',
    url: 'https://cyberconnect.hashnode.dev/cyberconnects-nft-recommendation-engine-1',
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1668488324995/jtGrzwz1d.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  },
  {
    title: 'Private peer-to-peer chat app with XMTP',
    section: "crypto",
    description: 'Give a short description of your project here.',
    url: 'https://cyberconnect.hashnode.dev/integrating-xmtp-into-cyberconnect-a-guide',
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1678166589286/51f71467-b14c-43e4-a16b-9888718ef48b.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  },
  {
    title: 'CyberTube',
    section: "crypto",
    description: 'CyberTube: A decentralized video-sharing platform built on CyberConnect using Livepeer',
    url: 'https://cyberconnect.hashnode.dev/cybertube-a-decentralized-video-sharing-platform-built-on-cyberconnect-using-livepeer',
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1679316393932/8a52ec4c-bc54-4800-95a3-c8e0634fbd23.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'June 2020',
    location: 'University of Chicago',
    title: 'MSc Data Science',
    content: <div><p>Relevant Coursework: Advanced ML, Deep Learning, NLP, Big Data, Data Engineering</p><p>Awards: Facebook Hackathon 2019 – WebBuilder ChatBot -  1st Place Prize</p></div>,
  },
  {
    date: 'December 2017',
    location: 'University of California, Berkeley',
    title: 'B.A Economics ',
    content: <p>Certification: Certificate in Entrepreneurship & Technology | UC Berkeley, IEOR Department  </p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'May 2022 - Present',
    location: 'CyberConnect',
    title: 'Head of Data',
    content: (
      <div style={{display: 'inline', float: 'left'}}>
          <ol style={{listStyleType: 'disc'}}>
            <li>Built all data pipelines, including indexing & decoding on/off-chain data from multiple chains using Airflow/Spark/dbt</li>
            <li>Developed nft & wallet recommendation engines, leveraging wallet trading/minting  history to power follow/content suggestions</li>
            <li>Maintained all internal/external dashboards (incl. dune, internal), retention/growth insights,  & analytics for partners on link3.to </li>
          </ol>
        </div>
    ),
  },
  {
    date: 'September 2020 - May 2022',
    location: 'Scale AI',
    title: 'Product/Data Analyst & Data Engineer',
    content: (
      <div style={{display: 'inline', float: 'left'}}>
      <ol style={{listStyleType: 'disc'}}>
        <li>Built all data pipelines, including indexing & decoding on/off-chain data from multiple chains using Airflow/Spark/dbt</li>
        <li>Developed nft & wallet recommendation engines, leveraging wallet trading/minting  history to power follow/content suggestions</li>
        <li>Maintained all internal/external dashboards (incl. dune, internal), retention/growth insights,  & analytics for partners on link3.to </li>
      </ol>
    </div>
    ),
  },
  {
    date: 'June 2020 - September 2020',
    location: 'Hive AI',
    title: 'Product Analyst',
    content: (
      <div style={{display: 'inline', float: 'left'}}>
      <ol style={{listStyleType: 'disc'}}>
        <li>Product lead for company’s new ML based text-moderation product; scope included dataset management, model training/deployment, post-training optimization, and monitoring/maintenance of SLAs</li>
        <li>Collaborated with the ML team to develop a human-assisted/in-the-loop model auditing system to identify model deficiencies and error patterns in production data. Improved model F-1 score by 24% with minimal additional training data.</li>
      </ol>
    </div>
    ),
  },
  {
    date: 'January 2018 - December 2018',
    location: 'Apple',
    title: 'Operations Internship',
    content: (
      <div style={{display: 'inline', float: 'left'}}>
      <ol style={{listStyleType: 'disc'}}>
        <li>Built data pipelines integrating internal & vendor data to reduce spend forecasts latency from 168 to 24hrs</li>
        <li>Managed data for $50M budget for iPhone XR dev builds and identified $1M fraudulent invoices through my analysis.</li>
      </ol>
    </div>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Daniel Kahneman',
      text: 'Working with Nazih made me rethink my two system theory of the mind. He is a true genius and a great person to work with.',
      image: 'https://pe.tedcdn.com/images/ted/152922_254x191.jpg',
    },
    {
      name: 'Friedrich August von Hayek',
      text: 'Freedom granted only when it is known beforehand that its effects will be beneficial is not freedom.',
      image: 'https://contemporarythinkers.org/friedrich-hayek/wp-content/uploads/sites/17/2015/05/f-hayek-bio.jpg',
    },
    {
      name: 'Marie Curie',
      text: 'Be less curious about people and more curious about ideas',
      image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTLqNCGhKGcOEVaHHWt51CQQvF3YkrTgHqhaXdBZbtAD1mEdQr-4Wx8PbhfO695-tlfpStk9Az1BQreDis',
    },
    {
      name: 'John Tukey',
      text: 'An approximate answer to the right problem is worth a good deal more than an exact answer to an approximate problem.',
      image: 'https://www.amphilsoc.org/sites/default/files/2019-10/Tukey%20graph%20head.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Feel free to reach out with any of the mediums below. I am always open to new opportunities, collaborations or just to chat about data science, machine learning, or anything else really :)',
  items: [
    {
      type: ContactType.Email,
      text: 'nazihkalo@gmail.com',
      href: 'mailto:nazihkalo@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'San Francisco, USA',
      href: 'https://www.google.com/maps/place/San+Francisco,+CA/@37.760722,-122.4957944,12.36z/data=!4m6!3m5!1s0x80859a6d00690021:0x4a501367f076adff!8m2!3d37.7749295!4d-122.4194155!16zL20vMGQ2bHA',
    },
    {
      type: ContactType.Twitter,
      text: '@kalo_nazih',
      href: 'https://www.twitter.com/kalo_nazih/',
    },
    {
      type: ContactType.Github,
      text: 'nazihkalo',
      href: 'https://github.com/nazihkalo',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/nazihkalo'},
  {label: 'Dune Analyics', Icon: DuneIcon, href: 'https://dune.com/NazihKalo'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/nazih-kalo/'},
  {label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/kalo_nazih'},
];
