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
