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
        $results = $('#results');

    $input.keyup(debounce(function () {
      var text = $input.val();

      searchWikipedia(text).then(
        function (data) {
          $results
            .empty()
            .append($.map(data[1], function (value) {
              return $('<li>').text(value);
            }));
        },
        function (err) {
          $results
            .empty()
            .append($('<li>'))
              .text('Error:' + error);
        }
      );
    }, 1000 /* 1 second */));
  });

}());
