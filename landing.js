/* Cash Cage — landing enhancements: settlement ledger resolve-on-scroll */
(function () {
  var ledger = document.getElementById('ledger');
  if (!ledger) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return; // resolved state already visible

  ledger.classList.add('is-settling'); // hide rows until observed

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        ledger.classList.add('is-resolved');
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(ledger);
})();
