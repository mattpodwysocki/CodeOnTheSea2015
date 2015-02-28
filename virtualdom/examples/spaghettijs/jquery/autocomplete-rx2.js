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
        $results = $('#results'),
        $template = Handlebars.compile($('items-template').html());

    $input.keyupAsObservable()
      .map(function () { return $input.val(); })
      .filter(function (text) { return text.length > 0; })
      .debounce(1000)
      .distinctUntilChanged()
      .flatMapLatest(searchWikipedia)
      .subscribe(
        function (data) {
          $results.html(template(data[1]));
        },
        function (err) {
          $results.html(template([err]));
        }
      )
    });
  });

}());
