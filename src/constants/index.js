import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  reactjs,
  nodejs,
  mongodb,
  git,
  solulab,
  cloudinlabs,
  dzap,
  goemon,
  carrent,
  jobit,
  tripguide,
  rust,
  solana,
  ethereum,
  aptos,
  nextjs,
  golang,
  goemonImage,
  dzapImage,
  bullscallImage,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "onchain",
    title: "Onchain",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Smart Contract Developer",
    icon: creator,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Security Researcher",
    icon: web,
  },
];

const technologies = [
  {
    name: "Ethereum",
    icon: ethereum,
  },
  {
    name: "Solana",
    icon: solana,
  },
  {
    name: "Aptos",
    icon: aptos,
  },
  {
    name: "Rust",
    icon: rust,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "GoLang",
    icon: golang,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Blockchain dev trainee",
    company_name: "Solulab",
    icon: solulab,
    iconBg: "#FFFFFF",
    date: "Apr 2023 - Jul 2023",
    points: [
      "Assisted senior devs in developing smart contract and frontend integrations",
      "Developed smart contracts for Multisig Treasury and wrote unit test cases for them",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack blockchain developer",
    company_name: "Cloudinlabs",
    icon: cloudinlabs,
    iconBg: "#FFFFFF",
    date: "Aug 2023 - Apr 2024",
    points: [
      "Lead the team of 3 and completed 4 main projects and side projects for the requirements of clients with best code practices.",
      "Ensured security and testing it in an time driven environment.",
      "Create smart contracts in Solidity(EVM), Rust(Solana) and integrate using React, Ethers.js, Solana web3.js",
    ],
  },
  {
    title: "Solidity Developer",
    company_name: "Dzap",
    icon: dzap,
    iconBg: "#FFFFFF",
    date: "May 2024 - July 2024",
    points: [
      "Handling smart contracts and security of $6.5 million worth of transactions per month",
      "Tested already deployed smart contracts and provided reports",
      "Developed smart contracts for limit order and batching while maintaining gas efficiency & security. Wrote test cases using Foundry following 100% coverage",
    ],
  },
  {
    title: "Smart contract and integrations",
    company_name: "Goemon",
    icon: goemon,
    iconBg: "#FFFFFF",
    date: "Nov 2024 - Present",
    points: [
      "Created smart contracts and integrations for options liquidity DEX+CEX platform",
      "Integrated Across bridge, Pendle, Anoma intents, cross chain bridging and EIP-7521.",
      "Working on creating programmatic intents that can automate any strategy across any blockchain using LLM and AI.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "DZap",
    description:
      "Handling smart contracts and security of $6.5 million TVL. Developed smart contracts for limit order and batching while maintaining gas efficiency & security.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "foundry",
        color: "green-text-gradient",
      },
    ],
    image: dzapImage,
    source_code_link: "https://app.dzap.io/dca",
  },
  {
    name: "Goemon",
    description:
      "Created smart contract and integrations for options liquidity DEX platform. Integrated across bridge, pendle swap, dex aggregator. Handled frontend and backend integrations",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "nextjs",
        color: "green-text-gradient",
      },
      {
        name: "golang",
        color: "pink-text-gradient",
      },
    ],
    image: goemonImage,
    source_code_link: "https://github.com/Goemon-xyz/core-contracts",
  },
  {
    name: "Bulls Call",
    description:
     "Candle betting app deployed on polygon network. Users can bet on the price of crypto assets whether it will go up or down. Implemented chainlink automation.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "react",
        color: "green-text-gradient",
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
    ],
    image: bullscallImage,
    source_code_link: "https://bullscall.vercel.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
