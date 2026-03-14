(function () {
  var html = document.documentElement;

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  function isDark() {
    var saved = storageGet('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme() {
    var saved = storageGet('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    } else {
      html.removeAttribute('data-theme');
    }
  }

  function toggle() {
    storageSet('theme', isDark() ? 'light' : 'dark');
    applyTheme();
    updateButton();
  }

  function updateButton() {
    var btn = document.querySelector('#dark-mode-toggle');
    var icon = btn && btn.querySelector('i');
    if (!icon) return;
    if (isDark()) {
      icon.className = 'fas fa-sun';
      icon.title = 'Switch to light mode';
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      icon.className = 'fas fa-moon';
      icon.title = 'Switch to dark mode';
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  function addButton() {
    var icons = document.querySelector('ul.icons.no-print');
    if (!icons) return;

    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.className = 'button button--sacnite button--round-l';
    btn.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
    btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');

    var icon = document.createElement('i');
    icon.className = isDark() ? 'fas fa-sun' : 'fas fa-moon';
    icon.title = isDark() ? 'Switch to light mode' : 'Switch to dark mode';

    btn.appendChild(icon);
    btn.addEventListener('click', toggle);
    li.appendChild(btn);
    icons.appendChild(li);
  }

  applyTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }

  // Keep in sync if system preference changes while page is open
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var mqHandler = function () {
    if (!storageGet('theme')) updateButton();
  };
  if (mq.addEventListener) {
    mq.addEventListener('change', mqHandler);
  } else if (mq.addListener) {
    mq.addListener(mqHandler);
  }
})();
