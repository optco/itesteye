(function() {
  // 1. Load external scripts
  const scriptsToLoad = [
    'https://itesteye.com/menu.js',
    'https://itesteye.com/footer.js'
  ];

  scriptsToLoad.forEach(function(url) {
    if (!document.querySelector('script[src="' + url + '"]')) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true; 
      document.head.appendChild(script);
    }
  });

  // 2. Mouse interaction logic
  let ticking = false;
  const root = document.documentElement;

  document.addEventListener('mousemove', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        // Normalize mouse position to a range of -1 to 1
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Yellow blob (Primary): Tracks mouse directly and strongly
        root.style.setProperty('--b3-x', (x * 120) + 'px');
        root.style.setProperty('--b3-y', (y * 120) + 'px');

        // Blue blob (Secondary): Moves opposite to mouse, simulating displacement
        root.style.setProperty('--b1-x', (x * -40) + 'px');
        root.style.setProperty('--b1-y', (y * -40) + 'px');

        // Green blob (Secondary): Moves opposite to mouse, simulating displacement
        root.style.setProperty('--b2-x', (x * -30) + 'px');
        root.style.setProperty('--b2-y', (y * -30) + 'px');

        ticking = false;
      });
      ticking = true;
    }
  });
})();
