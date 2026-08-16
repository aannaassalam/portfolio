/**
 * Single source of truth for every string and dataset on the homepage.
 * Swap BRAND + CASE_STUDIES + CONTACT for the real client data — no component
 * hardcodes copy.
 */

export const BRAND = {
  name: "Synk Innovations",
  /** Short form used in the lockup and page titles. */
  short: "Synk",
  tagline: "Designed for today. Engineered for what comes next."
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" }
] as const;

export const HERO = {
  eyebrow: "Digital engineering · Software · Innovation",
  headline: ["We build", "what comes next."],
  lede: "From ambitious ideas to scalable digital products, we design and engineer technology built for what's next.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Explore our work", href: "#work" },
  disciplines: ["Web", "Mobile", "SaaS", "AI", "Cloud", "Enterprise"]
};

export const COMPLEXITY = {
  first: "Every great product starts with complexity.",
  second: "Our job is to make it simple."
};

export const PHILOSOPHY = {
  eyebrow: "The problem",
  headline: ["Technology is rarely the problem.", "The way it's engineered is."],
  body: [
    "Most teams don't fail because they picked the wrong framework. They fail because systems were bolted together faster than they were understood — and every new feature costs more than the last.",
    "We start by mapping the whole system. Then we rebuild it so the next decade of changes stays cheap."
  ],
  /** Rendered as the chaotic network that reorganises on scroll. */
  symptoms: [
    "Disconnected systems",
    "Legacy technology",
    "Poor user experience",
    "Scalability ceilings",
    "Slow release cycles",
    "Fragmented data",
    "Unreliable infrastructure"
  ],
  resolvedLabel: "One coherent system"
};

export const SERVICES = [
  {
    id: "web",
    number: "01",
    title: "Web Applications",
    summary:
      "Complex platforms, SaaS products, marketplaces and enterprise applications.",
    detail:
      "Interface systems that stay fast at scale — design systems, real-time data, role-based workflows and the state management that holds it together.",
    capabilities: ["Design systems", "Real-time UI", "SSR & edge", "Workflows"]
  },
  {
    id: "mobile",
    number: "02",
    title: "Mobile Applications",
    summary:
      "Native-quality iOS and Android experiences designed around real user behaviour.",
    detail:
      "Offline-first data, native module bridges, biometric auth and release pipelines that ship to both stores from a single codebase.",
    capabilities: ["React Native", "Offline sync", "Native modules", "CI/CD"]
  },
  {
    id: "saas",
    number: "03",
    title: "SaaS Platforms",
    summary:
      "Scalable multi-tenant products, dashboards, workflows and subscription systems.",
    detail:
      "Tenancy models, billing and entitlements, usage metering and admin tooling — the unglamorous layers that decide whether a product can grow.",
    capabilities: ["Multi-tenancy", "Billing", "Analytics", "Admin tooling"]
  },
  {
    id: "ai",
    number: "04",
    title: "AI & Intelligent Systems",
    summary:
      "AI-powered products, automation, intelligent workflows and data-driven systems.",
    detail:
      "Retrieval pipelines, evaluation harnesses and human-in-the-loop review. We ship AI features with measurable output quality, not demos.",
    capabilities: ["LLM pipelines", "RAG", "Evaluation", "Automation"]
  },
  {
    id: "backend",
    number: "05",
    title: "Backend & APIs",
    summary:
      "Secure APIs, databases, microservices, integrations and high-performance infrastructure.",
    detail:
      "Typed contracts, schema evolution, queueing and idempotency. Systems that behave predictably when traffic and data both multiply.",
    capabilities: ["API design", "Data modelling", "Queues", "Integrations"]
  },
  {
    id: "cloud",
    number: "06",
    title: "Cloud & DevOps",
    summary:
      "Cloud architecture, deployment pipelines, monitoring, scalability and infrastructure.",
    detail:
      "Infrastructure as code, zero-downtime deploys, observability and cost control — so shipping on Friday stops being a gamble.",
    capabilities: ["IaC", "Observability", "Autoscaling", "Cost control"]
  }
] as const;

export type Service = (typeof SERVICES)[number];

/** x/y are normalised 0–1 constellation coordinates. */
export const TECHNOLOGIES = [
  { name: "React", note: "Interface layer", x: 0.16, y: 0.3, group: "frontend" },
  { name: "Next.js", note: "App framework", x: 0.31, y: 0.14, group: "frontend" },
  { name: "TypeScript", note: "Type safety end to end", x: 0.3, y: 0.5, group: "frontend" },
  { name: "Three.js", note: "Real-time 3D", x: 0.13, y: 0.68, group: "frontend" },
  { name: "React Native", note: "Mobile runtime", x: 0.44, y: 0.78, group: "frontend" },
  { name: "Node.js", note: "Service runtime", x: 0.47, y: 0.36, group: "backend" },
  { name: "Python", note: "Data & ML services", x: 0.58, y: 0.62, group: "backend" },
  { name: "PostgreSQL", note: "Relational core", x: 0.63, y: 0.24, group: "data" },
  { name: "MongoDB", note: "Document storage", x: 0.74, y: 0.48, group: "data" },
  { name: "Docker", note: "Reproducible builds", x: 0.83, y: 0.72, group: "infra" },
  { name: "AWS", note: "Cloud infrastructure", x: 0.86, y: 0.3, group: "infra" },
  { name: "LLM APIs", note: "Applied intelligence", x: 0.68, y: 0.85, group: "ai" }
] as const;

/** Which nodes are wired to which, by index. Keeps the graph deliberate. */
export const TECH_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 5],
  [0, 4],
  [4, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [6, 11],
  [7, 8],
  [7, 10],
  [8, 9],
  [9, 10],
  [10, 5],
  [11, 6]
];

/**
 * PLACEHOLDER PROJECT DATA — every metric below is illustrative.
 * Replace with real, verifiable numbers before this site goes live.
 */
export const CASE_STUDIES = [
  {
    number: "01",
    sector: "Fintech",
    title: "Financial planning platform",
    summary:
      "A scalable financial planning platform designed around intelligent workflows.",
    problem:
      "Advisors ran client plans across four disconnected tools, re-keying the same data and reconciling it by hand.",
    solution:
      "One modelling engine behind a single workspace — shared calculation core, audit trail on every projection, real-time collaboration.",
    result:
      "Plan turnaround dropped from days to the same afternoon, and compliance review stopped being a bottleneck.",
    metrics: [
      { value: "4→1", label: "Tools consolidated" },
      { value: "12x", label: "Faster projections" },
      { value: "99.95%", label: "Platform uptime" }
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    accent: "#8B5CF6"
  },
  {
    number: "02",
    sector: "Travel",
    title: "Multi-market booking engine",
    summary:
      "A booking platform serving eleven markets from one inventory system.",
    problem:
      "Each market ran its own fork. A pricing change took six weeks to roll out everywhere.",
    solution:
      "A single tenanted engine with market-level configuration, edge-cached availability and a shared design system.",
    result:
      "Pricing and content changes now deploy to every market in a single release.",
    metrics: [
      { value: "11", label: "Markets, one codebase" },
      { value: "6wk→1d", label: "Rollout time" },
      { value: "180ms", label: "Median search" }
    ],
    stack: ["React", "Node.js", "MongoDB", "Docker"],
    accent: "#A855F7"
  },
  {
    number: "03",
    sector: "Healthcare",
    title: "Clinical operations suite",
    summary:
      "Scheduling, records and reporting for a distributed care network.",
    problem:
      "Clinicians lost hours a week to duplicate entry across scheduling and records systems that never spoke to each other.",
    solution:
      "An event-driven integration layer with a mobile-first clinical interface built around how rounds actually happen.",
    result:
      "Documentation moved to the point of care, and reporting became a query instead of a project.",
    metrics: [
      { value: "-40%", label: "Admin time" },
      { value: "HIPAA", label: "Audited pipeline" },
      { value: "24/7", label: "Operational" }
    ],
    stack: ["React Native", "Python", "PostgreSQL", "AWS"],
    accent: "#7C3AED"
  },
  {
    number: "04",
    sector: "Commerce",
    title: "Intelligent merchandising",
    summary:
      "An AI layer that ranks and personalises a two-million-SKU catalogue.",
    problem:
      "Manual merchandising couldn't keep pace with the catalogue, so most inventory was effectively invisible.",
    solution:
      "A retrieval and ranking pipeline with an offline evaluation harness, shipped behind gradual rollout.",
    result:
      "Long-tail inventory became discoverable without handing control of the storefront to a black box.",
    metrics: [
      { value: "2M", label: "SKUs ranked" },
      { value: "+31%", label: "Discovery depth" },
      { value: "<100ms", label: "Ranking latency" }
    ],
    stack: ["Python", "LLM APIs", "PostgreSQL", "Docker"],
    accent: "#C4B5FD"
  }
] as const;

export const PROCESS = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the business, the users and the constraints that actually bind.",
    output: "Systems map · Risk register"
  },
  {
    number: "02",
    title: "Define",
    body: "Turn ideas into product requirements and a technical architecture.",
    output: "Architecture · Scope"
  },
  {
    number: "03",
    title: "Design",
    body: "Create intuitive experiences and the design system underneath them.",
    output: "Prototypes · Design system"
  },
  {
    number: "04",
    title: "Engineer",
    body: "Build the frontend, backend and infrastructure as one system.",
    output: "Tested builds · CI/CD"
  },
  {
    number: "05",
    title: "Launch",
    body: "Deploy, instrument and optimise against real traffic.",
    output: "Monitoring · Runbooks"
  },
  {
    number: "06",
    title: "Scale",
    body: "Continuously improve, extend and evolve the product with you.",
    output: "Roadmap · Iteration"
  }
] as const;

export const ARCHITECTURE = {
  eyebrow: "System architecture",
  headline: [
    "Great software isn't a collection of features.",
    "It's an ecosystem that works together."
  ],
  body: "We design every layer with the ones above and below it in mind — interface, service, data, infrastructure.",
  layers: [
    { name: "Interface", note: "Web · Mobile · Design system" },
    { name: "Application", note: "Domain logic · Workflows" },
    { name: "API", note: "Typed contracts · Gateways" },
    { name: "Intelligence", note: "Models · Retrieval · Evaluation" },
    { name: "Data", note: "Relational · Document · Events" },
    { name: "Infrastructure", note: "Cloud · Pipelines · Observability" }
  ]
};

/**
 * Engineering principles, deliberately qualitative. No invented statistics —
 * add real numbers here only when they can be substantiated.
 */
export const PRINCIPLES = [
  {
    label: "Resilient",
    body: "Failure paths designed before the happy path ships. Retries, timeouts and idempotency are requirements, not patches."
  },
  {
    label: "Scalable",
    body: "Horizontal by default. The architecture that serves your first thousand users serves the next million."
  },
  {
    label: "Secure",
    body: "Least privilege, encrypted transport and storage, dependency and secret scanning wired into the pipeline."
  },
  {
    label: "Performant",
    body: "Budgets set at design time and enforced in CI — for bundle size, query cost and response latency alike."
  },
  {
    label: "Observable",
    body: "Structured logs, traces and alerts from day one. If we can't see it, we can't operate it."
  },
  {
    label: "Maintainable",
    body: "Typed end to end, documented at the boundaries, and handed over so your team can own it."
  }
] as const;

export const TRUST = {
  eyebrow: "Where we work",
  headline: "Industries we've engineered for.",
  industries: [
    "Startups",
    "Enterprise",
    "Fintech",
    "Travel",
    "Healthcare",
    "Commerce",
    "Education",
    "Logistics"
  ]
};

export const ABOUT = {
  eyebrow: "Who we are",
  headline: ["We're engineers, designers", "and problem solvers."],
  body: [
    "We work at the intersection of business, design and technology — and we don't simply execute specifications.",
    "We challenge assumptions, simplify complexity and build systems designed to evolve. The result is software your team can keep changing long after we've handed it over."
  ],
  equation: [
    { term: "Strategy", note: "Decide what's worth building" },
    { term: "Design", note: "Make it obvious to use" },
    { term: "Engineering", note: "Make it hold up" }
  ],
  outcome: { term: "Product", note: "Something people actually use" }
};

export const CONTACT = {
  eyebrow: "Let's build it",
  headline: "Have something worth building?",
  lede: "Let's turn the idea into something real.",
  primaryCta: { label: "Start a conversation", href: "mailto:hello@synkinnovations.com" },
  secondaryCta: { label: "View our capabilities", href: "#services" },
  responseNote: "We reply to every enquiry within two business days."
};

export const FOOTER = {
  columns: [
    {
      title: "Company",
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "About", href: "#about" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Web applications", href: "#services" },
        { label: "Mobile applications", href: "#services" },
        { label: "SaaS platforms", href: "#services" },
        { label: "AI & intelligent systems", href: "#services" },
        { label: "Backend & APIs", href: "#services" },
        { label: "Cloud & DevOps", href: "#services" }
      ]
    },
    {
      title: "Elsewhere",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "GitHub", href: "https://github.com" },
        { label: "hello@synkinnovations.com", href: "mailto:hello@synkinnovations.com" }
      ]
    }
  ],
  location: "Remote-first · Working across UTC-5 to UTC+5:30"
};
