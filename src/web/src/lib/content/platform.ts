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

export const ENGINES = ['llama.cpp', 'vLLM', 'SGLang', 'Postgres', 'Traefik', 'Helm'] as const
