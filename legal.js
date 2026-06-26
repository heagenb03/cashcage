/* Cash Cage — legal pages progressive enhancement (scroll-spy) */
(function () {
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (!tocLinks.length || !('IntersectionObserver' in window)) return;

  var sections = tocLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);
  if (!sections.length) return;

  var current = null;
  function setActive(id) {
    if (current === id) return;
    current = id;
    tocLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) { a.setAttribute('aria-current', 'true'); }
      else { a.removeAttribute('aria-current'); }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries.filter(function (e) { return e.isIntersecting; });
    if (!visible.length) return;
    visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
    setActive(visible[0].target.id);
  }, { rootMargin: '-76px 0px -65% 0px', threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();
