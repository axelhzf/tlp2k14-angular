// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: true,

  theme: "moon", // available themes are in /css/theme
  transition: "none", // default/cube/page/concave/zoom/linear/fade/none

  // Parallax scrolling
  // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
  // parallaxBackgroundSize: '2100px 900px',

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: 'lib/js/classList.js', condition: function () {
      return !document.body.classList;
    } },
    { src: 'plugin/markdown/marked.js', condition: function () {
      return !!document.querySelector('[data-markdown]');
    } },
    { src: 'plugin/markdown/markdown.js', condition: function () {
      return !!document.querySelector('[data-markdown]');
    } },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function () {
      hljs.initHighlightingOnLoad();
    } },
    { src: 'plugin/zoom-js/zoom.js', async: true, condition: function () {
      return !!document.body.classList;
    } },
    { src: 'plugin/notes/notes.js', async: true, condition: function () {
      return !!document.body.classList;
    } }
  ]
});

function setBin (el) {
  var $el = $(el);
  var url = $el.data("jsbin");
  if (url) {
    var embed = '<iframe src="http://jsbin.com/' + url + '" class="jsbin-embed" id="" style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 300px; height: 30px;"></iframe>';
    $el.append(embed);
    $(window).trigger("resize");
  }
}

function removeBin (el) {
  var $el = $(el);
  $el.find(".jsbin-embed").remove();
}

Reveal.addEventListener('slidechanged', function (event) {
  setBin(event.currentSlide);
  removeBin(event.previousSlide);
});


setBin(Reveal.getCurrentSlide());