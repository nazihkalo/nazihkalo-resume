import { GitHubIcon, LinkedInIcon, XIcon, DuneIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Nazih Kalo",
  initials: "NK",
  location: "Brooklyn, NY",
  locationLink: "https://www.google.com/maps/place/Brooklyn,+NY/@40.6501,-73.9496,12z",
  about: "Data Scientist / Engineer focused on building high-quality data products and ML systems.",
  summary: (
    <>
      8+ years building analytics & ML platforms from 0→1. Scaled experimentation, real-time analytics, and recommender systems powering millions of users.
      Deeply interested in reinforcement learning, crypto, and decentralized technologies—always learning something new to stay sharp.
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
      badges: ["SF / NYC", "Data Science", "ML", "Python", "dbt"],
      title: "Staff Data Scientist",
      start: "Aug 2023",
      end: "Present",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Established company-wide data quality KPIs (coverage, freshness, accuracy, drift) across user-generated content and behavioral signals; implemented automated validation and anomaly detection with dbt + Python</li>
            <li>Built near-real-time analytics pipelines (ClickHouse + Snowflake) reducing data latency from minutes → seconds, enabling faster feedback loops for ML-driven rankings</li>
            <li>Scaled experimentation from 0 → 100s of A/Bs per quarter, introducing guardrails, selective holdouts, and post-launch monitoring tied to data quality changes</li>
          </ul>
        </>
      ),
    },
    {
      company: "CyberConnect",
      link: "https://cyberconnect.me",
      badges: ["San Francisco", "Data Engineering", "ML", "Python", "Spark"],
      title: "Head of Data",
      start: "May 2022",
      end: "Aug 2023",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Built data platform 0 → 1 using Airflow, Databricks, & dbt; dataset validation and monitoring for ML consumption</li>
            <li>Shipped recommendation system to 100k+ users owning offline metrics (precision/recall/coverage) & experimentation</li>
            <li>Designed dataset audits and bias analyses across chains, regions, and user cohorts to ensure fair exposure and robust model behavior</li>
            <li>Implemented embedding-based deduplication and similarity search (Pinecone) to improve training data diversity and reduce noise</li>
            <li>Translated ambiguous product goals into measurable data quality and ML performance roadmaps</li>
          </ul>
        </>
      ),
    },
    {
      company: "Scale AI",
      link: "https://scale.com",
      badges: ["San Francisco", "Data Engineering", "Product", "Python"],
      title: "Product/Data Analyst & Data Engineer",
      start: "Sep 2020",
      end: "May 2022",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Owned pipelines for large-scale data extraction and labeling programs supporting Fortune-500 ML systems</li>
            <li>Led ground-truth quality initiatives: error analysis, annotator agreement metrics, guideline revisions, and automated QA checks</li>
            <li>Reduced LiDAR and video labeling time by 34% by improving ML pre-labels, redesigning pipelines, and enabling lower-spec devices</li>
            <li>Ran cost-quality tradeoff experiments on labeling workflows, reducing variance ~50% while maintaining accuracy</li>
            <li>Built monitoring for label latency, coverage gaps, and drift, enabling faster iteration with ML teams</li>
          </ul>
        </>
      ),
    },
    {
      company: "Hive AI",
      link: "https://thehive.ai",
      badges: ["San Francisco", "ML", "Product"],
      title: "Product Analyst",
      start: "Jun 2020",
      end: "Sep 2020",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>Owned dataset → training → deployment lifecycle for ML moderation models</li>
            <li>Increased model F1 by 24% via targeted error mining, label audits, and human-in-the-loop reviews</li>
            <li>Defined production SLAs and post-launch monitoring for model and data quality</li>
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
