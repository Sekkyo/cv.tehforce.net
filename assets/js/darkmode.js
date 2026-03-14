(function () {
  var html = document.documentElement;

  function isDark() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    } else {
      html.removeAttribute('data-theme');
    }
  }

  function toggle() {
    localStorage.setItem('theme', isDark() ? 'light' : 'dark');
    applyTheme();
    updateButton();
  }

  function updateButton() {
    var icon = document.querySelector('#dark-mode-toggle i');
    if (!icon) return;
    if (isDark()) {
      icon.className = 'fas fa-sun';
      icon.title = 'Switch to light mode';
    } else {
      icon.className = 'fas fa-moon';
      icon.title = 'Switch to dark mode';
    }
  }

  function addButton() {
    var icons = document.querySelector('ul.icons.no-print');
    if (!icons) return;

    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.className = 'button button--sacnite button--round-l';
    btn.setAttribute('aria-label', 'Toggle dark mode');

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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem('theme')) updateButton();
  });
})();
