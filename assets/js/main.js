// Header background and progress bar on scroll, mobile menu, active nav link,
// photo viewer, footer year.
(function () {
  var header = document.getElementById('site-header');
  var toggle = header.querySelector('.menu-toggle');
  var links = header.querySelectorAll('.site-nav a');
  var progress = document.getElementById('scroll-progress');

  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 40);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  function closeMenu() {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  if ('IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && byId[entry.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          byId[entry.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Photos rise into place, a few at a time, as the grid scrolls into view.
  var tiles = document.querySelectorAll('.photo-grid li');
  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.setProperty('--i', batch++);
          entry.target.classList.add('is-in');
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    tiles.forEach(function (li) { reveal.observe(li); });
  } else {
    tiles.forEach(function (li) { li.classList.add('is-in'); });
  }

  // Photo viewer. Without JavaScript, each photo simply links to its Pexels page.
  var box = document.getElementById('lightbox');
  var photos = Array.prototype.slice.call(document.querySelectorAll('.photo-grid .ph'));
  if (box && photos.length && typeof box.showModal === 'function') {
    var img = box.querySelector('img');
    var text = box.querySelector('.lb-text');
    var link = box.querySelector('.lb-link');
    var current = 0;

    function show(i) {
      current = (i + photos.length) % photos.length;
      var a = photos[current];
      var thumb = a.querySelector('img');
      img.classList.add('is-loading');
      img.onload = function () { img.classList.remove('is-loading'); };
      img.src = a.getAttribute('data-full');
      img.alt = thumb.alt;
      var place = a.querySelector('.ph-place');
      text.textContent = a.querySelector('.ph-title').textContent + (place ? ', ' + place.textContent : '');
      link.href = a.href;
    }
    photos.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
        box.showModal();
      });
    });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    box.addEventListener('close', function () { img.removeAttribute('src'); photos[current].focus(); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
