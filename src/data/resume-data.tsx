import { GitHubIcon, LinkedInIcon, XIcon, DuneIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Nazih Kalo",
  initials: "NK",
  location: "Brooklyn, NY",
  locationLink: "https://www.google.com/maps/place/Brooklyn,+NY/@40.6501,-73.9496,12z",
  about: "Data Scientist / Engineer focused on building high-quality data products and ML systems.",
  summary: (
    <>
      From the wild world of crypto to the dynamic domain of data science, 
      my passion for exploring the cutting edge has led me down an exciting path of discovery. 
      I&apos;ve worked across multiple layers of the data stack; as a data scientist, data engineer, product analyst and a bit of frontend development.
      I enjoy exploring the power of AI, macro & behavioral economics, and incentive models to uncover insights that can help the companies I work with thrive.
    </>
  ),
  avatarUrl: "/me.jpeg",
  personalWebsiteUrl: "https://nazihkalo.com",
  contact: {
    email: "nazihkalo@gmail.com",
    tel: "+1 420 420 4200",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/nazihkalo",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nazih-kalo/",
        icon: LinkedInIcon,
      },
      {
        name: "Twitter",
        url: "https://twitter.com/kalo_nazih",
        icon: XIcon,
      },
      {
        name: "Dune",
        url: "https://dune.com/NazihKalo",
        icon: DuneIcon,
      },
    ],
  },
  education: [
    {
      school: "University of Chicago",
      degree: "MSc Data Science",
      start: "2019",
      end: "2020",
      description: "Relevant Coursework: Advanced ML, Deep Learning, NLP, Big Data, Data Engineering. Awards: Facebook Hackathon 2019 – WebBuilder ChatBot - 1st Place Prize"
    },
    {
      school: "University of California, Berkeley",
      degree: "B.A Economics",
      start: "2014",
      end: "2017",
      description: "Certificate in Entrepreneurship & Technology | UC Berkeley, IEOR Department"
    },
  ],
  work: [
    {
      company: "Phantom",
      link: "https://phantom.app",
      badges: ["Remote", "Data Science", "ML", "Python", "dbt"],
      title: "Senior Data Scientist",
      start: "2023",
      end: "Present",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Built all data pipelines, including indexing & decoding on/off-chain data from multiple chains using Airflow/Spark/dbt</li>
            <li>Developed nft & wallet recommendation engines, leveraging wallet trading/minting history to power follow/content suggestions</li>
            <li>Maintained all internal/external dashboards (incl. dune, internal), retention/growth insights, & analytics for partners</li>
          </ul>
        </>
      ),
    },
    {
      company: "CyberConnect",
      link: "https://cyberconnect.me",
      badges: ["Remote", "Data Engineering", "ML", "Python", "Spark"],
      title: "Head of Data",
      start: "2022",
      end: "2023",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Built all data pipelines, including indexing & decoding on/off-chain data from multiple chains using Airflow/Spark/dbt</li>
            <li>Developed nft & wallet recommendation engines, leveraging wallet trading/minting history to power follow/content suggestions</li>
            <li>Maintained all internal/external dashboards (incl. dune, internal), retention/growth insights, & analytics</li>
          </ul>
        </>
      ),
    },
    {
      company: "Scale AI",
      link: "https://scale.com",
      badges: ["San Francisco", "Data Engineering", "Product", "Python"],
      title: "Product Manager → Data Engineer",
      start: "2020",
      end: "2022",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Built & maintained data pipelines for the company&apos;s largest data extraction/scraping project, scraping 12M+ products from ~5000 ecommerce sites</li>
            <li>Developed internal Payout Optimizer to dynamically adjust payout functions to hit target rates; reduced pay variance by ~50% and led to $90k savings/month</li>
            <li>Deployed self-hosted data cataloging tool (Amundsen), improving data discovery across the company</li>
            <li>Reduced LiDAR labeling time 34% through optimizing ML pre-labels and developing a new labeling pipeline</li>
          </ul>
        </>
      ),
    },
    {
      company: "Hive AI",
      link: "https://thehive.ai",
      badges: ["San Francisco", "ML", "Product"],
      title: "Product Analyst",
      start: "2020",
      end: "2020",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Product lead for company&apos;s new ML based text-moderation product</li>
            <li>Collaborated with the ML team to develop a human-assisted model auditing system to identify model deficiencies</li>
          </ul>
        </>
      ),
    },
    {
      company: "Apple",
      link: "https://apple.com",
      badges: ["Cupertino", "Data Analysis", "Operations"],
      title: "Operations Intern",
      start: "2018",
      end: "2018",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Built data pipelines integrating internal & vendor data to reduce spend forecasts latency from 168 to 24hrs</li>
            <li>Managed data for $50M budget for iPhone XR dev builds and identified $1M fraudulent invoices through analysis</li>
          </ul>
        </>
      ),
    },
  ],
  skills: [
    "Python",
    "SQL",
    "dbt",
    "Spark",
    "Airflow/Dagster",
    "AWS",
    "GCP",
    "Machine Learning",
    "NLP",
    "Data Engineering",
    "GraphQL",
    "React/TypeScript",
  ],
  projects: [
    {
      title: "NFT Recommendation Engine",
      techStack: ["Python", "ML", "Collaborative Filtering"],
      description: "A recommendation engine built using NFT trading history data & collaborative filtering",
      link: {
        label: "CyberConnect Blog",
        href: "https://cyberconnect.hashnode.dev/cyberconnects-nft-recommendation-engine-1",
      },
    },
    {
      title: "XMTP Chat Integration",
      techStack: ["React", "TypeScript", "Web3"],
      description: "Private peer-to-peer chat app combining CyberConnect's social network with XMTP's messaging protocol",
      link: {
        label: "Guide",
        href: "https://cyberconnect.hashnode.dev/integrating-xmtp-into-cyberconnect-a-guide",
      },
    },
    {
      title: "Steel Defect Detection",
      techStack: ["Python", "Computer Vision", "Deep Learning"],
      description: "Detecting Defects in Steel Manufacturing Line using Computer Vision",
      link: {
        label: "GitHub",
        href: "https://github.com/nazihkalo/steel_defect_detection",
      },
    },
  ],
} as const;
