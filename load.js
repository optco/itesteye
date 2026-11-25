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

  // 2. Randomize blob positions on page load
  const root = document.documentElement;

  // Helper to generate a random percentage between a min and max value
  function getRandomPosition(min, max) {
    return (Math.random() * (max - min) + min) + '%';
  }

  // Apply random positions. 
  // Capped between 0% and 60% to prevent them from going completely off-screen 
  // given their large pixel widths (300px to 500px).
  root.style.setProperty('--b1-top', getRandomPosition(0, 60));
  root.style.setProperty('--b1-left', getRandomPosition(0, 60));

  root.style.setProperty('--b2-top', getRandomPosition(0, 60));
  root.style.setProperty('--b2-left', getRandomPosition(0, 60));

  root.style.setProperty('--b3-top', getRandomPosition(0, 60));
  root.style.setProperty('--b3-left', getRandomPosition(0, 60));
})();
