(function() {

  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      var callNow = !timeout;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function searchWikipedia(term) {
    return $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: window.encodeURI(term)
      }
    }).promise();
  }

  $(function () {
    var $input = $('#textInput'),
        $results = $('#results'),
        $template = Handlebars.compile($('items-template').html());;

    var previousValue = '';

    $input.keyup(debounce(function () {
      var text = $input.val();

      if (text !== previousValue && text.length > 0) {
        previousValue = text;

        searchWikipedia(text).then(
          function (data) {
            $results.html($template(data[1]));
          },
          function (err) {
            $results.html($template([err]));
          }
        );
      }, 1000 /* 1 second */));
    }
  });

}());
