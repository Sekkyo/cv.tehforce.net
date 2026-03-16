(function () {
  // Inject SVG filter for hand-drawn icon treatment.
  // Must run after body exists; defer attribute handles timing.
  document.addEventListener('DOMContentLoaded', function () {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    svg.innerHTML =
      '<defs>' +
        '<filter id="sketchy" x="-15%" y="-15%" width="130%" height="130%">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="7"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="displaced"/>' +
          '<feGaussianBlur in="displaced" stdDeviation="0.4"/>' +
        '</filter>' +
      '</defs>';
    document.body.insertBefore(svg, document.body.firstChild);
  });
})();
