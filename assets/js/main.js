window.addEventListener("scroll", () => {

  let scrollTop = window.scrollY;
  let docHeight = document.body.scrollHeight - window.innerHeight;
  let scrolled = scrollTop / docHeight;

  document.documentElement.style.setProperty("--scroll", scrolled);
});

// ===== Membership Carousel =====
(function () {
  const track = document.getElementById('plansTrack');
  if (!track) return;

  const cards = Array.from(track.children);
  const dotsWrap = document.getElementById('plansDots');
  const prevBtn = document.querySelector('.plans-nav--prev');
  const nextBtn = document.querySelector('.plans-nav--next');

  let index = cards.findIndex(c => c.classList.contains('plan--featured'));
  if (index < 0) index = 1;

 
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i+1}`);
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll('button').forEach((b, i) => {
      if (i === index) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  function go(i) {
    index = (i + cards.length) % cards.length;
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    updateDots();
    
  }


  setTimeout(() => go(index), 50);

  prevBtn.addEventListener('click', () => go(index - 1));
  nextBtn.addEventListener('click', () => go(index + 1));

  
  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      let nearest = 0, min = Infinity;
      cards.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(center - window.innerWidth / 2);
        if (dist < min) { min = dist; nearest = i; }
      });
      index = nearest;
      updateDots();
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

const categoryBtn = document.getElementById("categoryBtn");
const megaMenu = document.getElementById("megaMenu");

categoryBtn.addEventListener("click", () => {
  megaMenu.classList.toggle("active");
});


document.addEventListener("click", (e) => {
  if (!categoryBtn.contains(e.target) && !megaMenu.contains(e.target)) {
    megaMenu.classList.remove("active");
  }
});

