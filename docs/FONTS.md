# Fonts

Both sites self-host four families. No font request leaves the origin.

| Family | Files | Used for |
| --- | --- | --- |
| Archivo (variable) | `archivo.woff2` | display headlines, wordmarks, section labels |
| IBM Plex Sans (variable) | `plex-sans.woff2` | Latin body copy and interface text |
| IBM Plex Mono | `plex-mono-400.woff2`, `plex-mono-500.woff2` | code, captions, metadata, tables |
| Vazirmatn (variable) | `vazirmatn-arabic.woff2`, `vazirmatn-latin.woff2` | Persian body and display; Latin fallback during Persian pages |

The files live in:

- `src/web/src/assets/fonts/`
- `src/binchitects/src/assets/fonts/`

Vite fingerprints them into `/assets/*.woff2` at build time. The prerender
scripts look up those hashed names and emit a `<link rel="preload">` for the
two faces each language needs first:

- English: Archivo + IBM Plex Sans
- Persian: Vazirmatn Arabic + Archivo

## What was cut

The originals total roughly 241 KB per site. The committed subsets total about
126 KB for Argus and 135 KB for the studio (the studio keeps a wider Archivo
range for its braces). A visitor downloads only the faces their page uses:

- Archivo is limited on the Argus site to `wght 100–720` and `wdth 100–112%`.
  The studio uses `wdth 82–104%` because its braces and headings are narrower.
  Those are the only ranges the CSS asks for. The Argus file is 33 KB; the
  studio file is 42 KB.
- IBM Plex Sans is limited to `wght 100–700` (29 KB).
- IBM Plex Mono is split into static 400 and 500 cuts (about 9 KB each).
- Vazirmatn is split by script with `unicode-range`: the Arabic/Persian file is
  27 KB and the Latin file is 20 KB, so neither loads the other's glyphs. Both
  keep the variable weight range `100–720`.
- Glyph coverage is the union of the text actually used by both sites, plus
  Persian and Latin punctuation, Persian digits and ZWNJ. A copy change that
  introduces an unusual glyph should regenerate the subsets; ordinary English
  and Persian copy is already covered.

The browser only fetches a face when a rendered glyph needs it. On a Persian
page, for example, the Latin Vazirmatn file loads for Latin words, while the
Arabic file is preloaded.

## Licenses

All four families are licensed under the SIL Open Font License 1.1. The full
license text is in [`OFL.txt`](OFL.txt). Copyright notices:

- **Archivo** — Copyright 2020 The Archivo Project Authors
  (https://github.com/Omnibus-Type/Archivo).
- **IBM Plex Sans** — Copyright 2019 IBM Corp. All rights reserved.
- **IBM Plex Mono** — Copyright 2017 IBM Corp. All rights reserved.
- **Vazirmatn** — Copyright 2015 The Vazirmatn Project Authors
  (https://github.com/rastikerdar/vazirmatn).

The subsets are modified versions of those fonts. They remain under the OFL;
the license does not apply to the website's own text or design.

## Regenerating

The subsets were produced from the Fontsource source files with
[`subset-font`](https://www.npmjs.com/package/subset-font) (HarfBuzz), then the
variable axes were clamped with `fontTools.varLib.instancer`. Fontsource is not
a runtime or build dependency: the `.woff2` files are committed, so production
builds do not download fonts.

If you change the copy substantially:

1. Rebuild the character inventory from `src/web/src` and
   `src/binchitects/src` plus the base Latin and Persian sets.
2. Subset each source face to `woff2`.
3. Clamp Archivo to the ranges above and Vazirmatn/Plex Sans to `wght 100–720`
   and `100–700` respectively.
4. Write the results into both `src/assets/fonts/` directories.
5. Run both production builds and check that the prerendered pages still
   preload two faces per language.

The font CSS is the single source of truth for family names, weight ranges and
`unicode-range`; keep it in sync with any regeneration.
