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

  // 2. Mouse parallax logic for background blobs
  let ticking = false;
  const root = document.documentElement;

  document.addEventListener('mousemove', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        // Normalize mouse position to a range of -1 to 1
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Calculate parallax offsets. 
        // Adjust the multipliers (30, -20, 15) to change the depth effect.
        // Blob 1 (Blue): moves with mouse
        root.style.setProperty('--b1-x', (x * 30) + 'px');
        root.style.setProperty('--b1-y', (y * 30) + 'px');

        // Blob 2 (Green): moves opposite to mouse for depth
        root.style.setProperty('--b2-x', (x * -20) + 'px');
        root.style.setProperty('--b2-y', (y * -20) + 'px');

        // Blob 3 (Yellow): subtle movement
        root.style.setProperty('--b3-x', (x * 15) + 'px');
        root.style.setProperty('--b3-y', (y * 15) + 'px');

        ticking = false;
      });
      ticking = true;
    }
  });
})();
