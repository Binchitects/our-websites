// Runs before the page paints, so the chosen theme is the first thing drawn.
// Kept as a file (not an inline script) so the web image can keep script-src 'self'.
;(function () {
  try {
    var stored = localStorage.getItem('argus-theme')
    var theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch (error) {
    document.documentElement.dataset.theme = 'dark'
  }
})()
