import {
  Activity,
  AudioLines,
  Bot,
  Boxes,
  Brain,
  ClipboardCheck,
  Code2,
  Database,
  FileSearch,
  FlaskConical,
  GitPullRequest,
  KeyRound,
  MessagesSquare,
  Palette,
  SearchCode,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export const SITE = {
  name: 'ARGUS',
  product: 'Argus Arena',
  domain: 'argus.binchitects.com',
  url: 'https://argus.binchitects.com',
  version: '7.7.0',
  description:
    'Argus Arena is the self-hosted AI platform: chat, Code Arena, a code index, studio, meetings, agents and compliance evidence, on your GPUs inside your network.',
  github: 'https://github.com/Binchitects/argus',
  org: 'https://github.com/Binchitects',
  issues: 'https://github.com/Binchitects/argus/issues',
  releases: 'https://github.com/Binchitects/argus/releases',
  changelog: 'https://github.com/Binchitects/argus/blob/main/CHANGELOG.md',
  licensing: 'https://github.com/Binchitects/argus/blob/main/LICENSING.md',
  securityPolicy: 'https://github.com/Binchitects/argus/blob/main/SECURITY.md',
  docs: 'https://github.com/Binchitects/argus/tree/main/docs',
  quickStart: 'https://github.com/Binchitects/argus#quick-start',
  deployment: 'https://github.com/Binchitects/argus/blob/main/docs/deployment.md',
  architecture: 'https://github.com/Binchitects/argus/blob/main/docs/architecture.md',
  codeArenaDocs: 'https://github.com/Binchitects/argus/blob/main/docs/code-arena.md',
  argusDocs: 'https://github.com/Binchitects/argus/blob/main/docs/argus/README.md',
  compliance: 'https://github.com/Binchitects/argus/blob/main/docs/compliance/README.md',
} as const

export const NAV = [
  { label: 'Platform', href: '/platform' },
  { label: 'Code Arena', href: '/code-arena' },
  { label: 'Argus', href: '/argus' },
  { label: 'Security', href: '/security' },
  { label: 'Changelog', href: '/changelog' },
] as const

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Code Arena', href: '/code-arena' },
      { label: 'Argus code index', href: '/argus' },
      { label: 'Security and compliance', href: '/security' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Deploy',
    links: [
      { label: 'Quick start', href: SITE.quickStart, external: true },
      { label: 'Deployment guide', href: SITE.deployment, external: true },
      { label: 'Architecture', href: SITE.architecture, external: true },
      { label: 'Documentation', href: SITE.docs, external: true },
      { label: 'Offline installer', href: `${SITE.deployment}#offline-install`, external: true },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Licensing', href: SITE.licensing, external: true },
      { label: 'Compliance', href: SITE.compliance, external: true },
      { label: 'Security policy', href: SITE.securityPolicy, external: true },
      { label: 'Privacy note', href: '/privacy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Binchitects', href: SITE.org, external: true },
      { label: 'Brand', href: '/brand' },
      { label: 'Talk to us', href: '/contact' },
      { label: 'Issues', href: SITE.issues, external: true },
      { label: 'Releases', href: SITE.releases, external: true },
    ],
  },
] as const

export type Feature = {
  title: string
  body: string
  icon: LucideIcon
  href?: string
  tag?: string
}

export const PLATFORM_GROUPS: {
  eyebrow: string
  title: string
  body: string
  features: Feature[]
}[] = [
  {
    eyebrow: 'Work',
    title: 'The work your team already does, in one sign-in.',
    body: 'A chat, a coding agent, a studio, meetings and agents share the same models, the same tools, the same memory and the same budgets. Nobody buys their own subscription and nothing leaves the network.',
    features: [
      {
        title: 'A chat with server-side tools',
        body: 'Thinking levels, branches, file attachments and room-wide conversations. Python runs in a sandbox, web access is what an admin allows, and code questions go through Argus. Generated pages, diagrams and React components run live beside the answer.',
        icon: MessagesSquare,
        tag: 'Chat',
      },
      {
        title: 'Code Arena, the coding agent',
        body: 'A full IDE in the browser around an agent that reads, changes and runs the code in your project folder. Plans first for long work, keeps a session synced with the web chat, and installs as one self-contained file.',
        icon: Code2,
        tag: 'Code',
      },
      {
        title: 'Studio',
        body: 'Pictures, edits with a brush, video, voices, music, background removal, vector art with named parts that animate, and 3D models ready to print — on the same GPUs as everything else.',
        icon: Palette,
        tag: 'Media',
      },
      {
        title: 'Meetings',
        body: 'Record in the browser or upload a recording. Get who said what, the minutes, and action items given to people and reminded on their day.',
        icon: AudioLines,
        tag: 'Meetings',
      },
      {
        title: 'Agents and apps',
        body: 'Agent Studio builds agents that react to GitLab and act on it. Turn a chat into an app, ask questions of databases and files, search a wiki of everything the company knows, make a deck, or watch a browser agent do a task.',
        icon: Bot,
        tag: 'Agents',
      },
      {
        title: 'Memory',
        body: 'One memory for chat and Code Arena. It recalls by meaning across thousands of messages, forms memories from quiet chats, and tidies itself with undo. A project keeps its long memory in .remember/.',
        icon: Brain,
        tag: 'Memory',
      },
    ],
  },
  {
    eyebrow: 'Knowledge',
    title: 'Answers that quote your code, not ones that guess at it.',
    body: 'A local model is good at reasoning and bad at recall. Header names, import libraries and error codes are exactly the facts a model states confidently and gets wrong. Argus puts those facts in front of it at answer time.',
    features: [
      {
        title: 'Argus code index over MCP',
        body: 'Symbols, references, file contents and the graph of what each repository uses of the others. find_symbol, find_references, search_code, semantic_search, repo_map, dependency_path, change_impact and more across every repository a person may see.',
        icon: SearchCode,
        tag: 'Argus',
      },
      {
        title: 'Documentation packs',
        body: 'Self-contained archives of public reference material: Windows SDK and WDK, MSVC C++, cppreference, Qt, .NET, Python, PowerShell, algorithms and system design. Look one up by name, by behaviour, or verify a draft.',
        icon: FileSearch,
        tag: 'Packs',
      },
      {
        title: 'Merge requests and issues',
        body: 'mr_list, mr_diff, mr_commits, ci_status, job_log, issue_list, wiki_get and file_at read GitLab read-only for any project the caller belongs to, indexed or not — with the same per-person check.',
        icon: GitPullRequest,
        tag: 'GitLab',
      },
      {
        title: 'Company knowledge',
        body: 'GitLab wikis and issues, GitHub and Gitea, Confluence, Jira, Notion, SharePoint, WebDAV, S3, folders, websites, feeds and uploads. Searched by each person within their rights; long files by their passages.',
        icon: Database,
        tag: 'Knowledge',
      },
      {
        title: 'Security reviews',
        body: 'A repository read for weaknesses as you: each finding quotes its line, names its CWE and traces the data to it, grounded in CWE, OWASP and CodeQL guidance. Packages are matched against GitHub advisories daily, and Fix it opens a merge request.',
        icon: ShieldCheck,
        tag: 'AppSec',
      },
      {
        title: 'Science lab',
        body: 'Mathematics, physics, chemistry, statistics, biology and quantum computing, checked by SymPy, units, RDKit, Biopython, Lean with Mathlib, Qiskit, Stim, QuTiP, PennyLane and PySCF. Every problem is kept as a notebook.',
        icon: FlaskConical,
        tag: 'Lab',
      },
    ],
  },
  {
    eyebrow: 'Operations',
    title: 'Yours to run, yours to prove.',
    body: 'SSO and LDAP, two-factor sign-in, a key and a budget for each person, groups that decide which models and tools are allowed. An audit log nobody changes unseen and the evidence for an audit in one download.',
    features: [
      {
        title: 'Identity and rights',
        body: 'SSO (OIDC or SAML), LDAP and two-factor sign-in. API keys of one’s own, each with its limits and budget, and a group for every team that decides which models and tools it may use.',
        icon: KeyRound,
        tag: 'Identity',
      },
      {
        title: 'Fair, observable capacity',
        body: 'A fair line keeps everyone moving when the GPUs are busy. A dashboard for each role, live checks of every control, and a prompt log behind its own permission.',
        icon: Activity,
        tag: 'Ops',
      },
      {
        title: 'An audit trail you can hand over',
        body: 'Every action is audited and no one can change it unseen. Controls are checked live, and the evidence behind them is one download for your auditor.',
        icon: ClipboardCheck,
        tag: 'Evidence',
      },
      {
        title: 'Any open model, any engine',
        body: 'llama.cpp, vLLM or SGLang, chosen at install. Any open model the engine supports, with its licence shown before download. llama.cpp serves embeddings on the CPU to keep the GPU for answers.',
        icon: Server,
        tag: 'Engines',
      },
      {
        title: 'Deploy the way you run things',
        body: 'Docker Compose on one host, Podman rootless, GPUs across several servers, an offline installer for a host with no network, or a Helm chart that rolls without a gap and grows with load.',
        icon: Boxes,
        tag: 'Deploy',
      },
      {
        title: 'GRC and certifications',
        body: 'Fourteen frameworks with every clause mapped: ISO 27001, 42001 and 22301, SOC 2, PCI DSS, NIST CSF, 800-53 and 800-171, the AI RMF and the EU AI Act — with a risk register, Statements of Applicability, policies and audits.',
        icon: ClipboardCheck,
        tag: 'GRC',
      },
    ],
  },
]

export const ARGUS_EVIDENCE = [
  {
    value: '0 / 18',
    label: 'claims wrong when quoted verbatim',
    detail: 'With the documentation in front of it, a model that copied the answer made no contract mistakes.',
  },
  {
    value: '33%',
    label: 'claims wrong when paraphrased',
    detail: 'The same documentation, reworded, was enough to reintroduce a third of the errors.',
  },
  {
    value: '100%',
    label: 'claims wrong from memory',
    detail: 'Asked without documentation, the model was confidently wrong every time.',
  },
] as const

export const COMPARISON = [
  {
    capability: 'Code and conversations stay on your network',
    us: 'yes',
    cloud: 'no',
    diy: 'yes',
  },
  {
    capability: 'Knows your codebase, within each person’s GitLab rights',
    us: 'yes',
    cloud: 'some, through their cloud',
    diy: 'you build it',
  },
  {
    capability: 'Chat, coding agent, studio, meetings and agents in one sign-in',
    us: 'yes',
    cloud: 'several subscriptions',
    diy: 'several projects to glue',
  },
  {
    capability: 'A key, a budget and model rights for each person',
    us: 'yes',
    cloud: 'per seat',
    diy: 'no',
  },
  {
    capability: 'Any open model, on your own GPUs',
    us: 'yes',
    cloud: 'no',
    diy: 'yes',
  },
  {
    capability: 'Installs on a host with no internet',
    us: 'yes',
    cloud: 'no',
    diy: 'rarely',
  },
  {
    capability: 'Controls and evidence for ISO 27001, SOC 2, HIPAA and the GDPR',
    us: 'yes, yours to hand over',
    cloud: 'their own, not yours',
    diy: 'you build it',
  },
] as const

export const FAQS = [
  {
    question: 'What does ARGUS need to run?',
    answer:
      'A Linux host with Docker (or rootless Podman) and an NVIDIA GPU for the model engines. A quick start is a clone, a filled-in .env, and docker compose up -d. For a host with no internet there is one .run file that carries everything, and for a cluster there is a Helm chart.',
  },
  {
    question: 'Can it really run with no internet at all?',
    answer:
      'Yes. The offline installer carries every image, the app, the scripts and the checks, and it installs only the features you choose. Models are added from a folder or fetched once when you allow it. Nothing in the stack needs a vendor service to work.',
  },
  {
    question: 'Which models can we use?',
    answer:
      'Any open model the engine supports. llama.cpp takes GGUF files, vLLM and SGLang take their own formats, and the chat, studio, speech and embedding models are chosen by you. Each model card and licence is shown before a download.',
  },
  {
    question: 'Does it replace our GitLab?',
    answer:
      'No. Argus reads GitLab with a read-only token and mirrors what it needs. It never writes to your repositories. Each person sees exactly what their own GitLab account can read, enforced in SQL, not by a prompt.',
  },
  {
    question: 'How does Code Arena fit with the chat?',
    answer:
      'Code Arena is a coding agent with a browser IDE, installed on a developer’s machine as one file. It talks only to your Arena, uses the same models and tools as the chat, works as that person, and every session is synced with the web chat.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Argus Arena is free to use under the AGPL-3.0-only. A commercial licence is for uses the AGPL does not fit: a hosted or managed offering without publishing your source, closed distribution, private modifications used over a network, or use of the names and logos. Tell us what you are building and we will point you to the right one.',
  },
  {
    question: 'Can we keep our existing sign-in?',
    answer:
      'Yes. Arena supports SSO over OIDC or SAML, LDAP, and two-factor sign-in. Every person keeps their own identity, and Code Arena and API keys are tied to it too.',
  },
  {
    question: 'How do we prove it to an auditor?',
    answer:
      'Every action is written to an audit log nobody changes unseen. Controls are checked live, and each framework is mapped clause by clause — ISO 27001, ISO 42001, ISO 22301, SOC 2, PCI DSS, NIST CSF, 800-53 and 800-171, the AI RMF and the EU AI Act — with the evidence in one download.',
  },
] as const

export const ENGINES = ['llama.cpp', 'vLLM', 'SGLang', 'Postgres', 'Traefik', 'Helm'] as const

export const CONTACT_TOPICS = [
  { value: 'walkthrough', label: 'Book a walkthrough' },
  { value: 'license', label: 'Commercial licence' },
  { value: 'deployment', label: 'Deployment and architecture' },
  { value: 'security', label: 'Security and compliance review' },
  { value: 'partnership', label: 'Partnership or reseller' },
  { value: 'other', label: 'Something else' },
] as const
