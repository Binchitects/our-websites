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
