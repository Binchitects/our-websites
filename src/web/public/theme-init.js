// Runs before the page paints, so the chosen theme is the first thing drawn.
// Kept as a file (not an inline script) so the web image can keep script-src 'self'.
;(function () {
  try {
    var stored = localStorage.getItem('argus-theme')
    // Paper is the primary face: only an explicit dark preference starts dark.
    var theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch (error) {
    document.documentElement.dataset.theme = 'dark'
  }
})()
