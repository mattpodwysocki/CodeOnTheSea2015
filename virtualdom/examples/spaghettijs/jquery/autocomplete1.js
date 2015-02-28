(function() {

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

    $input.keyup(function () {
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
    });
  });

}());
