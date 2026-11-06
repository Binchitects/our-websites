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
