(function() {

  function searchWikipedia(term) {
    return $.ajaxAsObservable({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: window.encodeURI(term)
      }
    });
  }

  $(function () {
    var $input = $('#textInput'),
        $results = $('#results');

    $input.keyupAsObservable()
      .map(function () { return $input.val(); })
      .filter(function (text) { return text.length > 0; })
      .debounce(1000)
      .distinctUntilChanged()
      .flatMapLatest(searchWikipedia)
      .subscribe(
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
      )
    });
  });

}());
