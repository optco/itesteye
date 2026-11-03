(function() {
  // Define the exact URLs of the two external JS files
  const scriptsToLoad = [
    '/menu.js',
    '/footer.js'
  ];

  scriptsToLoad.forEach(function(url) {
    // Prevent duplicate injection if the script is already on the page
    if (!document.querySelector('script[src="' + url + '"]')) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true; 
      document.head.appendChild(script);
    }
  });
})();
