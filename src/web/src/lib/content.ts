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
  descriptionFa:
    'Argus Arena پلتفرم هوش مصنوعی خودمیزبان است: چت، Code Arena، نمایهٔ کد، استودیو، جلسه‌ها، عامل‌ها و شواهد انطباق، روی GPUهای خودتان و داخل شبکهٔ خودتان.',
  github: 'https://github.com/Binchitects/argus',
  org: 'https://github.com/Binchitects',
  studio: 'https://binchitects.com',
  issues: 'https://github.com/Binchitects/argus/issues',
  releases: 'https://github.com/Binchitects/argus/releases',
  changelog: 'https://github.com/Binchitects/argus/blob/main/CHANGELOG.md',
  licensing: 'https://github.com/Binchitects/argus/blob/main/LICENSING.md',
  securityPolicy: 'https://github.com/Binchitects/argus/blob/main/SECURITY.md',
  contributing: 'https://github.com/Binchitects/argus/blob/main/CONTRIBUTING.md',
  docs: 'https://github.com/Binchitects/argus/tree/main/docs',
  quickStart: 'https://github.com/Binchitects/argus#quick-start',
  deployment: 'https://github.com/Binchitects/argus/blob/main/docs/deployment.md',
  architecture: 'https://github.com/Binchitects/argus/blob/main/docs/architecture.md',
  codeArenaDocs: 'https://github.com/Binchitects/argus/blob/main/docs/code-arena.md',
  argusDocs: 'https://github.com/Binchitects/argus/blob/main/docs/argus/README.md',
  compliance: 'https://github.com/Binchitects/argus/blob/main/docs/compliance/README.md',
} as const

export type NavItem = { label: string; labelFa: string; href: string }

export const NAV: NavItem[] = [
  { label: 'Platform', labelFa: 'پلتفرم', href: '/platform' },
  { label: 'Code Arena', labelFa: 'Code Arena', href: '/code-arena' },
  { label: 'Argus', labelFa: 'Argus', href: '/argus' },
  { label: 'Security', labelFa: 'امنیت', href: '/security' },
  { label: 'Changelog', labelFa: 'تغییرات', href: '/changelog' },
]

export type FooterLink = { label: string; labelFa: string; href: string; external?: boolean }
export type FooterColumn = { title: string; titleFa: string; links: FooterLink[] }

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    titleFa: 'محصول',
    links: [
      { label: 'Platform', labelFa: 'پلتفرم', href: '/platform' },
      { label: 'Code Arena', labelFa: 'Code Arena', href: '/code-arena' },
      { label: 'Argus code index', labelFa: 'نمایهٔ کد Argus', href: '/argus' },
      { label: 'Security and compliance', labelFa: 'امنیت و انطباق', href: '/security' },
      { label: 'Changelog', labelFa: 'تغییرات', href: '/changelog' },
    ],
  },
  {
    title: 'Deploy',
    titleFa: 'استقرار',
    links: [
      { label: 'Quick start', labelFa: 'شروع سریع', href: SITE.quickStart, external: true },
      { label: 'Deployment guide', labelFa: 'راهنمای استقرار', href: SITE.deployment, external: true },
      { label: 'Architecture', labelFa: 'معماری', href: SITE.architecture, external: true },
      { label: 'Documentation', labelFa: 'مستندات', href: SITE.docs, external: true },
      { label: 'Offline installer', labelFa: 'نصب‌کنندهٔ آفلاین', href: `${SITE.deployment}#offline-install`, external: true },
    ],
  },
  {
    title: 'Trust',
    titleFa: 'اعتماد',
    links: [
      { label: 'Licensing', labelFa: 'مجوز', href: SITE.licensing, external: true },
      { label: 'Compliance', labelFa: 'انطباق', href: SITE.compliance, external: true },
      { label: 'Security policy', labelFa: 'سیاست امنیتی', href: SITE.securityPolicy, external: true },
      { label: 'Privacy note', labelFa: 'یادداشت حریم خصوصی', href: '/privacy' },
    ],
  },
  {
    title: 'Company',
    titleFa: 'شرکت',
    links: [
      { label: 'Binchitects', labelFa: 'Binchitects', href: SITE.studio, external: true },
      { label: 'Brand', labelFa: 'برند', href: '/brand' },
      { label: 'Contributing', labelFa: 'مشارکت', href: SITE.contributing, external: true },
      { label: 'Talk to us', labelFa: 'با ما حرف بزنید', href: '/contact' },
      { label: 'Issues', labelFa: 'ایشوها', href: SITE.issues, external: true },
      { label: 'Releases', labelFa: 'انتشارها', href: SITE.releases, external: true },
    ],
  },
 ]

export type Feature = {
  title: string
  titleFa?: string
  body: string
  bodyFa?: string
  icon: LucideIcon
  href?: string
  tag?: string
}

export const PLATFORM_GROUPS: {
  eyebrow: string
  eyebrowFa?: string
  title: string
  titleFa?: string
  body: string
  bodyFa?: string
  features: Feature[]
}[] = [
  {
    eyebrow: 'Work',
    eyebrowFa: 'کار',
    title: 'The work your team already does, in one sign-in.',
    titleFa: 'همان کاری که تیم شما انجام می‌دهد، با یک ورود.',
    body: 'A chat, a coding agent, a studio, meetings and agents share the same models, the same tools, the same memory and the same budgets. Nobody buys their own subscription and nothing leaves the network.',
    bodyFa: 'چت، عامل کدنویسی، استودیو، جلسه‌ها و عامل‌ها از همان مدل‌ها، همان ابزارها، همان حافظه و همان بودجه استفاده می‌کنند. هیچ‌کس اشتراک جداگانه نمی‌خرد و هیچ‌چیز از شبکه بیرون نمی‌رود.',
    features: [
      {
        title: 'A chat with server-side tools',
        titleFa: 'چتی با ابزارهای سمت سرور',
        body: 'Thinking levels, branches, file attachments and room-wide conversations. Python runs in a sandbox, web access is what an admin allows, and code questions go through Argus. Generated pages, diagrams and React components run live beside the answer.',
        bodyFa: 'سطح‌های تفکر، شاخه‌ها، پیوست فایل و گفتگوهای اتاقی. Python در یک سندباکس اجرا می‌شود، دسترسی به وب همان است که مدیر اجازه می‌دهد و پرسش‌های کد از Argus عبور می‌کنند. صفحه‌ها، نمودارها و کامپوننت‌های React ساخته‌شده، کنار پاسخ و به‌صورت زنده اجرا می‌شوند.',
        icon: MessagesSquare,
        tag: 'Chat',
      },
      {
        title: 'Code Arena, the coding agent',
        titleFa: 'Code Arena، عامل کدنویسی',
        body: 'A full IDE in the browser around an agent that reads, changes and runs the code in your project folder. Plans first for long work, keeps a session synced with the web chat, and installs as one self-contained file.',
        bodyFa: 'یک IDE کامل در مرورگر، حول عاملی که کد موجود در پوشهٔ پروژه را می‌خواند، تغییر می‌دهد و اجرا می‌کند. برای کارهای طولانی اول برنامه می‌دهد، نشست را با چت وب هم‌گام نگه می‌دارد و به‌صورت یک فایل خودکفا نصب می‌شود.',
        icon: Code2,
        tag: 'Code',
      },
      {
        title: 'Studio',
        titleFa: 'استودیو',
        body: 'Pictures, edits with a brush, video, voices, music, background removal, vector art with named parts that animate, and 3D models ready to print — on the same GPUs as everything else.',
        bodyFa: 'تصویر، ویرایش با قلم‌مو، ویدیو، صدا، موسیقی، حذف پس‌زمینه، وکتورهای دارای اجزای نام‌دار و متحرک، و مدل‌های سه‌بعدی آمادهٔ چاپ — روی همان GPUهایی که بقیهٔ کارها.',
        icon: Palette,
        tag: 'Media',
      },
      {
        title: 'Meetings',
        titleFa: 'جلسه‌ها',
        body: 'Record in the browser or upload a recording. Get who said what, the minutes, and action items given to people and reminded on their day.',
        bodyFa: 'در مرورگر ضبط کنید یا یک فایل را بارگذاری کنید. بفهمید چه کسی چه گفت، صورت‌جلسه را بگیرید و کارهای بعدی را به افراد بسپارید تا در روز مقرر یادآوری شوند.',
        icon: AudioLines,
        tag: 'Meetings',
      },
      {
        title: 'Agents and apps',
        titleFa: 'عامل‌ها و برنامه‌ها',
        body: 'Agent Studio builds agents that react to GitLab and act on it. Turn a chat into an app, ask questions of databases and files, search a wiki of everything the company knows, make a deck, or watch a browser agent do a task.',
        bodyFa: 'Agent Studio عامل‌هایی می‌سازد که به GitLab واکنش نشان می‌دهند و روی آن عمل می‌کنند. یک چت را به برنامه تبدیل کنید، از پایگاه‌داده‌ها و فایل‌ها پرسش کنید، در ویکیِ همهٔ دانش شرکت جست‌وجو کنید، اسلاید بسازید یا عاملی را در مرورگر تماشا کنید که کاری را انجام می‌دهد.',
        icon: Bot,
        tag: 'Agents',
      },
      {
        title: 'Memory',
        titleFa: 'حافظه',
        body: 'One memory for chat and Code Arena. It recalls by meaning across thousands of messages, forms memories from quiet chats, and tidies itself with undo. A project keeps its long memory in .remember/.',
        bodyFa: 'یک حافظه برای چت و Code Arena. بر اساس معنا در میان هزاران پیام به‌یاد می‌آورد، از گفتگوهای آرام حافظه می‌سازد و خودش را با امکان بازگرداندن مرتب می‌کند. هر پروژه حافظهٔ بلندمدت خود را در ‎.remember/‎ نگه می‌دارد.',
        icon: Brain,
        tag: 'Memory',
      },
    ],
  },
  {
    eyebrow: 'Knowledge',
    eyebrowFa: 'دانش',
    title: 'Answers that quote your code, not ones that guess at it.',
    titleFa: 'پاسخ‌هایی که کد شما را نقل می‌کنند، نه پاسخ‌هایی که حدس می‌زنند.',
    body: 'A local model is good at reasoning and bad at recall. Header names, import libraries and error codes are exactly the facts a model states confidently and gets wrong. Argus puts those facts in front of it at answer time.',
    bodyFa: 'مدل محلی در استدلال خوب است و در یادآوری ضعیف. نام هدرها، کتابخانه‌های import و کدهای خطا دقیقاً همان واقعیت‌هایی هستند که مدل با اطمینان بیان می‌کند و اشتباه می‌گوید. Argus همان واقعیت‌ها را در لحظهٔ پاسخ جلوی مدل می‌گذارد.',
    features: [
      {
        title: 'Argus code index over MCP',
        titleFa: 'نمایهٔ کد Argus روی MCP',
        body: 'Symbols, references, file contents and the graph of what each repository uses of the others. find_symbol, find_references, search_code, semantic_search, repo_map, dependency_path, change_impact and more across every repository a person may see.',
        bodyFa: 'نمادها، ارجاع‌ها، محتوای فایل‌ها و گرافِ استفادهٔ هر مخزن از مخزن‌های دیگر. find_symbol، find_references، search_code، semantic_search، repo_map، dependency_path، change_impact و بیشتر، در هر مخزنی که فرد اجازهٔ دیدنش را دارد.',
        icon: SearchCode,
        tag: 'Argus',
      },
      {
        title: 'Documentation packs',
        titleFa: 'بسته‌های مستندات',
        body: 'Self-contained archives of public reference material: Windows SDK and WDK, MSVC C++, cppreference, Qt, .NET, Python, PowerShell, algorithms and system design. Look one up by name, by behaviour, or verify a draft.',
        bodyFa: 'آرشیوهای خودکفای منابع عمومی: Windows SDK و WDK، MSVC C++، cppreference، Qt، .NET، Python، PowerShell، الگوریتم‌ها و طراحی سیستم. با نام، با رفتار یا با بررسی یک پیش‌نویس جست‌وجو کنید.',
        icon: FileSearch,
        tag: 'Packs',
      },
      {
        title: 'Merge requests and issues',
        titleFa: 'Merge requestها و ایشوها',
        body: 'mr_list, mr_diff, mr_commits, ci_status, job_log, issue_list, wiki_get and file_at read GitLab read-only for any project the caller belongs to, indexed or not — with the same per-person check.',
        bodyFa: 'mr_list، mr_diff، mr_commits، ci_status، job_log، issue_list، wiki_get و file_at، GitLab را فقط‌خواندنی برای هر پروژه‌ای که کاربر عضو آن است می‌خوانند — نمایه‌شده یا نشده — با همان بررسی فردی.',
        icon: GitPullRequest,
        tag: 'GitLab',
      },
      {
        title: 'Company knowledge',
        titleFa: 'دانش سازمان',
        body: 'GitLab wikis and issues, GitHub and Gitea, Confluence, Jira, Notion, SharePoint, WebDAV, S3, folders, websites, feeds and uploads. Searched by each person within their rights; long files by their passages.',
        bodyFa: 'ویکی‌ها و ایشوهای GitLab، GitHub و Gitea، Confluence، Jira، Notion، SharePoint، WebDAV، S3، پوشه‌ها، وب‌سایت‌ها، فیدها و فایل‌های بارگذاری‌شده. هر فرد در محدودهٔ اختیارات خود جست‌وجو می‌کند و فایل‌های بلند بر اساس بخش‌هایشان.',
        icon: Database,
        tag: 'Knowledge',
      },
      {
        title: 'Security reviews',
        titleFa: 'بازبینی امنیتی',
        body: 'A repository read for weaknesses as you: each finding quotes its line, names its CWE and traces the data to it, grounded in CWE, OWASP and CodeQL guidance. Packages are matched against GitHub advisories daily, and Fix it opens a merge request.',
        bodyFa: 'مخزن به‌جای شما برای یافتن ضعف‌ها خوانده می‌شود: هر یافته خط خود را نقل می‌کند، CWE خود را نام می‌برد و داده را تا آن ردیابی می‌کند، بر پایهٔ راهنمایی‌های CWE، OWASP و CodeQL. بسته‌ها روزانه با هشدارهای GitHub مقایسه می‌شوند و «اصلاحش کن» یک merge request باز می‌کند.',
        icon: ShieldCheck,
        tag: 'AppSec',
      },
      {
        title: 'Science lab',
        titleFa: 'آزمایشگاه علمی',
        body: 'Mathematics, physics, chemistry, statistics, biology and quantum computing, checked by SymPy, units, RDKit, Biopython, Lean with Mathlib, Qiskit, Stim, QuTiP, PennyLane and PySCF. Every problem is kept as a notebook.',
        bodyFa: 'ریاضی، فیزیک، شیمی، آمار، زیست‌شناسی و محاسبات کوانتومی، با بررسی SymPy، units، RDKit، Biopython، Lean با Mathlib، Qiskit، Stim، QuTiP، PennyLane و PySCF. هر مسئله به‌صورت یک نوتبوک نگه داشته می‌شود.',
        icon: FlaskConical,
        tag: 'Lab',
      },
    ],
  },
  {
    eyebrow: 'Operations',
    eyebrowFa: 'عملیات',
    title: 'Yours to run, yours to prove.',
    titleFa: 'از آنِ شما برای اجرا، از آنِ شما برای اثبات.',
    body: 'SSO and LDAP, two-factor sign-in, a key and a budget for each person, groups that decide which models and tools are allowed. An audit log nobody changes unseen and the evidence for an audit in one download.',
    bodyFa: 'SSO و LDAP، ورود دو مرحله‌ای، یک کلید و یک بودجه برای هر فرد و گروه‌هایی که تعیین می‌کنند کدام مدل‌ها و ابزارها مجازند. گزارش ممیزی‌ای که کسی نمی‌تواند پنهانی تغییرش دهد و شواهد ممیزی در یک دانلود.',
    features: [
      {
        title: 'Identity and rights',
        titleFa: 'هویت و اختیارات',
        body: 'SSO (OIDC or SAML), LDAP and two-factor sign-in. API keys of one’s own, each with its limits and budget, and a group for every team that decides which models and tools it may use.',
        bodyFa: 'SSO (OIDC یا SAML)، LDAP و ورود دو مرحله‌ای. کلیدهای API شخصی، هرکدام با محدودیت و بودجهٔ خود، و یک گروه برای هر تیم که تعیین می‌کند کدام مدل‌ها و ابزارها را می‌تواند استفاده کند.',
        icon: KeyRound,
        tag: 'Identity',
      },
      {
        title: 'Fair, observable capacity',
        titleFa: 'ظرفیت منصفانه و قابل مشاهده',
        body: 'A fair line keeps everyone moving when the GPUs are busy. A dashboard for each role, live checks of every control, and a prompt log behind its own permission.',
        bodyFa: 'یک صف منصفانه وقتی GPUها مشغول‌اند همه را به حرکت نگه می‌دارد. داشبوردی برای هر نقش، بررسی زندهٔ هر کنترل و گزارش prompt پشت مجوز اختصاصی خود.',
        icon: Activity,
        tag: 'Ops',
      },
      {
        title: 'An audit trail you can hand over',
        titleFa: 'رد ممیزی‌ای که می‌توانید تحویل دهید',
        body: 'Every action is audited and no one can change it unseen. Controls are checked live, and the evidence behind them is one download for your auditor.',
        bodyFa: 'هر اقدام ممیزی می‌شود و کسی نمی‌تواند پنهانی تغییرش دهد. کنترل‌ها به‌صورت زنده بررسی می‌شوند و شواهد پشت آن‌ها در یک دانلود برای ممیز شما آماده است.',
        icon: ClipboardCheck,
        tag: 'Evidence',
      },
      {
        title: 'Any open model, any engine',
        titleFa: 'هر مدل باز، هر موتور',
        body: 'llama.cpp, vLLM or SGLang, chosen at install. Any open model the engine supports, with its licence shown before download. llama.cpp serves embeddings on the CPU to keep the GPU for answers.',
        bodyFa: 'llama.cpp، vLLM یا SGLang، در زمان نصب انتخاب می‌شود. هر مدل بازی که موتور پشتیبانی کند، با نمایش مجوزش پیش از دانلود. llama.cpp امبدینگ‌ها را روی CPU سرو می‌کند تا GPU برای پاسخ‌ها بماند.',
        icon: Server,
        tag: 'Engines',
      },
      {
        title: 'Deploy the way you run things',
        titleFa: 'آن‌گونه مستقر کنید که کارتان را اداره می‌کنید',
        body: 'Docker Compose on one host, Podman rootless, GPUs across several servers, an offline installer for a host with no network, or a Helm chart that rolls without a gap and grows with load.',
        bodyFa: 'Docker Compose روی یک میزبان، Podman بدون root، GPUها روی چند سرور، نصب‌کنندهٔ آفلاین برای میزبانی بدون شبکه، یا یک Helm chart که بدون وقفه به‌روز می‌شود و با بار رشد می‌کند.',
        icon: Boxes,
        tag: 'Deploy',
      },
      {
        title: 'GRC and certifications',
        titleFa: 'GRC و گواهی‌ها',
        body: 'Fourteen frameworks with every clause mapped: ISO 27001, 42001 and 22301, SOC 2, PCI DSS, NIST CSF, 800-53 and 800-171, the AI RMF and the EU AI Act — with a risk register, Statements of Applicability, policies and audits.',
        bodyFa: 'چهارده چارچوب با نقشه‌برداری تک‌تک بندها: ISO 27001، 42001 و 22301، SOC 2، PCI DSS، NIST CSF، 800-53 و 800-171، AI RMF و EU AI Act — همراه با دفتر ریسک، بیانیه‌های کاربردپذیری، سیاست‌ها و ممیزی‌ها.',
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
    labelFa: 'ادعای اشتباه وقتی عیناً نقل شد',
    detail: 'With the documentation in front of it, a model that copied the answer made no contract mistakes.',
    detailFa: 'وقتی مستندات جلوی مدل بود، مدلی که پاسخ را کپی کرد هیچ اشتباهی در قراردادها نداشت.',
  },
  {
    value: '33%',
    label: 'claims wrong when paraphrased',
    labelFa: 'ادعای اشتباه وقتی بازنویسی شد',
    detail: 'The same documentation, reworded, was enough to reintroduce a third of the errors.',
    detailFa: 'همان مستندات، با بازنویسی، کافی بود تا یک‌سوم خطاها برگردند.',
  },
  {
    value: '100%',
    label: 'claims wrong from memory',
    labelFa: 'ادعای اشتباه از حافظه',
    detail: 'Asked without documentation, the model was confidently wrong every time.',
    detailFa: 'وقتی بدون مستندات پرسیده شد، مدل هر بار با اطمینان اشتباه گفت.',
  },
] as const

export const COMPARISON = [
  {
    capability: 'Code and conversations stay on your network',
    capabilityFa: 'کد و گفتگوها داخل شبکهٔ خودتان می‌مانند',
    us: 'yes',
    usFa: 'بله',
    cloud: 'no',
    cloudFa: 'خیر',
    diy: 'yes',
    diyFa: 'بله',
  },
  {
    capability: 'Knows your codebase, within each person’s GitLab rights',
    capabilityFa: 'کدبیس شما را می‌شناسد، در محدودهٔ اختیارات GitLab هر فرد',
    us: 'yes',
    usFa: 'بله',
    cloud: 'some, through their cloud',
    cloudFa: 'تا حدی، از طریق ابر خودشان',
    diy: 'you build it',
    diyFa: 'خودتان می‌سازید',
  },
  {
    capability: 'Chat, coding agent, studio, meetings and agents in one sign-in',
    capabilityFa: 'چت، عامل کدنویسی، استودیو، جلسه‌ها و عامل‌ها با یک ورود',
    us: 'yes',
    usFa: 'بله',
    cloud: 'several subscriptions',
    cloudFa: 'چند اشتراک جداگانه',
    diy: 'several projects to glue',
    diyFa: 'چند پروژه که باید به هم وصل شوند',
  },
  {
    capability: 'A key, a budget and model rights for each person',
    capabilityFa: 'یک کلید، یک بودجه و اختیار مدل برای هر فرد',
    us: 'yes',
    usFa: 'بله',
    cloud: 'per seat',
    cloudFa: 'به‌ازای هر کاربر',
    diy: 'no',
    diyFa: 'خیر',
  },
  {
    capability: 'Any open model, on your own GPUs',
    capabilityFa: 'هر مدل باز، روی GPUهای خودتان',
    us: 'yes',
    usFa: 'بله',
    cloud: 'no',
    cloudFa: 'خیر',
    diy: 'yes',
    diyFa: 'بله',
  },
  {
    capability: 'Installs on a host with no internet',
    capabilityFa: 'روی میزبانی بدون اینترنت نصب می‌شود',
    us: 'yes',
    usFa: 'بله',
    cloud: 'no',
    cloudFa: 'خیر',
    diy: 'rarely',
    diyFa: 'به‌ندرت',
  },
  {
    capability: 'Controls and evidence for ISO 27001, SOC 2, HIPAA and the GDPR',
    capabilityFa: 'کنترل‌ها و شواهد برای ISO 27001، SOC 2، HIPAA و GDPR',
    us: 'yes, yours to hand over',
    usFa: 'بله، از آنِ شما برای تحویل',
    cloud: 'their own, not yours',
    cloudFa: 'از آنِ خودشان، نه شما',
    diy: 'you build it',
    diyFa: 'خودتان می‌سازید',
  },
] as const

export const FAQS = [
  {
    question: 'What does ARGUS need to run?',
    questionFa: 'برای اجرای ARGUS چه چیزی لازم است؟',
    answer:
      'A Linux host with Docker (or rootless Podman) and an NVIDIA GPU for the model engines. A quick start is a clone, a filled-in .env, and docker compose up -d. For a host with no internet there is one .run file that carries everything, and for a cluster there is a Helm chart.',
    answerFa:
      'یک میزبان Linux با Docker (یا Podman بدون root) و یک GPU انویدیا برای موتورهای مدل. شروع سریع یعنی clone، یک فایل .env پر شده و docker compose up -d. برای میزبانی بدون اینترنت یک فایل .run هست که همه‌چیز را همراه دارد و برای کلاستر یک Helm chart.',
  },
  {
    question: 'Can it really run with no internet at all?',
    questionFa: 'آیا واقعاً بدون هیچ اینترنتی اجرا می‌شود؟',
    answer:
      'Yes. The offline installer carries every image, the app, the scripts and the checks, and it installs only the features you choose. Models are added from a folder or fetched once when you allow it. Nothing in the stack needs a vendor service to work.',
    answerFa:
      'بله. نصب‌کنندهٔ آفلاین همهٔ ایمیج‌ها، برنامه، اسکریپت‌ها و بررسی‌ها را همراه دارد و فقط قابلیت‌هایی را نصب می‌کند که انتخاب کنید. مدل‌ها از یک پوشه اضافه می‌شوند یا یک‌بار وقتی اجازه دهید دریافت می‌شوند. هیچ بخشی از استک برای کار به سرویس فروشنده نیاز ندارد.',
  },
  {
    question: 'Which models can we use?',
    questionFa: 'از کدام مدل‌ها می‌توانیم استفاده کنیم؟',
    answer:
      'Any open model the engine supports. llama.cpp takes GGUF files, vLLM and SGLang take their own formats, and the chat, studio, speech and embedding models are chosen by you. Each model card and licence is shown before a download.',
    answerFa:
      'هر مدل بازی که موتور پشتیبانی کند. llama.cpp فایل‌های GGUF را می‌گیرد، vLLM و SGLang قالب‌های خودشان را، و مدل‌های چت، استودیو، گفتار و امبدینگ را شما انتخاب می‌کنید. کارت و مجوز هر مدل پیش از دانلود نشان داده می‌شود.',
  },
  {
    question: 'Does it replace our GitLab?',
    questionFa: 'آیا جای GitLab ما را می‌گیرد؟',
    answer:
      'No. Argus reads GitLab with a read-only token and mirrors what it needs. It never writes to your repositories. Each person sees exactly what their own GitLab account can read, enforced in SQL, not by a prompt.',
    answerFa:
      'خیر. Argus با یک توکن فقط‌خواندنی GitLab را می‌خواند و آنچه لازم دارد آینه می‌کند. هرگز در مخزن‌های شما نمی‌نویسد. هر فرد دقیقاً همان چیزی را می‌بیند که حساب GitLab خودش می‌تواند بخواند؛ این محدودیت در SQL اعمال می‌شود، نه در prompt.',
  },
  {
    question: 'How does Code Arena fit with the chat?',
    questionFa: 'Code Arena چطور با چت هماهنگ می‌شود؟',
    answer:
      'Code Arena is a coding agent with a browser IDE, installed on a developer’s machine as one file. It talks only to your Arena, uses the same models and tools as the chat, works as that person, and every session is synced with the web chat.',
    answerFa:
      'Code Arena یک عامل کدنویسی با IDE مرورگری است که به‌صورت یک فایل روی دستگاه توسعه‌دهنده نصب می‌شود. فقط با Arena شما حرف می‌زند، از همان مدل‌ها و ابزارهای چت استفاده می‌کند، با هویت همان فرد کار می‌کند و هر نشستش با چت وب هم‌گام است.',
  },
  {
    question: 'What does it cost?',
    questionFa: 'هزینه‌اش چقدر است؟',
    answer:
      'Argus Arena is free to use under the AGPL-3.0-only. A commercial licence is for uses the AGPL does not fit: a hosted or managed offering without publishing your source, closed distribution, private modifications used over a network, or use of the names and logos. Tell us what you are building and we will point you to the right one.',
    answerFa:
      'Argus Arena تحت مجوز AGPL-3.0-only رایگان است. مجوز تجاری برای مواردی است که AGPL پاسخ نمی‌دهد: ارائهٔ میزبانی‌شده یا مدیریت‌شده بدون انتشار کد منبع، توزیع بسته، تغییرات خصوصی که در شبکه استفاده می‌شوند، یا استفاده از نام‌ها و نشان‌ها. بگویید چه می‌سازید تا به گزینهٔ درست راهنمایی‌تان کنیم.',
  },
  {
    question: 'Can we keep our existing sign-in?',
    questionFa: 'آیا می‌توانیم ورود فعلی خود را نگه داریم؟',
    answer:
      'Yes. Arena supports SSO over OIDC or SAML, LDAP, and two-factor sign-in. Every person keeps their own identity, and Code Arena and API keys are tied to it too.',
    answerFa:
      'بله. Arena از SSO روی OIDC یا SAML، LDAP و ورود دو مرحله‌ای پشتیبانی می‌کند. هر فرد هویت خودش را نگه می‌دارد و Code Arena و کلیدهای API هم به همان هویت گره می‌خورند.',
  },
  {
    question: 'How do we prove it to an auditor?',
    questionFa: 'چطور آن را به ممیز اثبات کنیم؟',
    answer:
      'Every action is written to an audit log nobody changes unseen. Controls are checked live, and each framework is mapped clause by clause — ISO 27001, ISO 42001, ISO 22301, SOC 2, PCI DSS, NIST CSF, 800-53 and 800-171, the AI RMF and the EU AI Act — with the evidence in one download.',
    answerFa:
      'هر اقدام در گزارش ممیزی‌ای نوشته می‌شود که کسی نمی‌تواند پنهانی تغییرش دهد. کنترل‌ها به‌صورت زنده بررسی می‌شوند و هر چارچوب بند‌به‌بند نقشه‌برداری شده است — ISO 27001، ISO 42001، ISO 22301، SOC 2، PCI DSS، NIST CSF، 800-53 و 800-171، AI RMF و EU AI Act — و شواهد در یک دانلود.',
  },
] as const

export const ENGINES = ['llama.cpp', 'vLLM', 'SGLang', 'Postgres', 'Traefik', 'Helm'] as const

export const CONTACT_TOPICS = [
  { value: 'walkthrough', label: 'Book a walkthrough', labelFa: 'رزرو یک معرفی کامل' },
  { value: 'license', label: 'Commercial licence', labelFa: 'مجوز تجاری' },
  { value: 'deployment', label: 'Deployment and architecture', labelFa: 'استقرار و معماری' },
  { value: 'security', label: 'Security and compliance review', labelFa: 'بازبینی امنیت و انطباق' },
  { value: 'partnership', label: 'Partnership or reseller', labelFa: 'همکاری یا نمایندگی فروش' },
  { value: 'other', label: 'Something else', labelFa: 'موضوعی دیگر' },
] as const
