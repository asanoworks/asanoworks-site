// DAYT uses the device's local date and time, synchronized each second.
(() => {
  const clock = document.querySelector('.dayt-clock');
  if (!clock) return;
  // Keep B intact; choose C by default for this local font comparison.
  clock.dataset.variant = new URLSearchParams(window.location.search).get('dayt') === 'b' ? 'b' : 'c';
  if (clock.dataset.variant === 'c') {
    const fontStylesheet = document.createElement('link');
    fontStylesheet.rel = 'stylesheet';
    fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap&text=0123456789%3A';
    document.head.appendChild(fontStylesheet);
  }
  const time = clock.querySelector('time');
  const hoursMinutes = clock.querySelector('.dayt-hours-minutes');
  const seconds = clock.querySelector('.dayt-seconds');
  const date = clock.querySelector('.dayt-date');
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  let timer;

  function setTimePart(part, value) {
    if (clock.dataset.variant !== 'c') {
      part.textContent = value;
      return;
    }
    // Playfair Display has no tnum feature; give each digit a fixed-width slot.
    part.replaceChildren(...Array.from(value, character => {
      const slot = document.createElement('span');
      slot.className = character === ':' ? 'dayt-colon' : 'dayt-digit';
      slot.textContent = character;
      return slot;
    }));
  }

  function updateTime() {
    clearTimeout(timer);
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const secondValue = String(now.getSeconds()).padStart(2, '0');
    const value = `${hours}:${minutes}`;
    if (hoursMinutes.textContent !== value) {
      setTimePart(hoursMinutes, value);
    }
    if (seconds.textContent !== `:${secondValue}`) {
      const hasPreviousValue = seconds.textContent !== '';
      setTimePart(seconds, `:${secondValue}`);
      // Animate only the seconds, with no rolling or continuous motion.
      seconds.classList.remove('is-stepping');
      if (hasPreviousValue) {
        void seconds.offsetWidth;
        seconds.classList.add('is-stepping');
      }
    }
    time.dateTime = `${value}:${secondValue}`;
    time.setAttribute('aria-label', `現在時刻 ${hours}時${minutes}分${secondValue}秒`);
    const dateValue = dateFormat.format(now).toUpperCase();
    if (date.textContent !== dateValue) {
      date.textContent = dateValue;
      date.dateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
    clock.hidden = false;
    timer = setTimeout(updateTime, 1000 - now.getMilliseconds());
  }

  updateTime();
  // Resync after a background tab or sleeping device resumes.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateTime();
  });
  window.addEventListener('pageshow', updateTime);
})();
