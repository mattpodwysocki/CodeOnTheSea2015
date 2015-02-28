(function () {

  function searchWikipedia (term) {
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
      + encodeURIComponent(term) + '&callback=JSONPCallback';
    return Rx.DOM.jsonpRequest(url);
  }

  // Debounce, distinctUntilChanged, pluck for free
  function main() {
    var textInput = document.getElementById('textInput');
    var results = document.getElementById('results');
    var template = Handlebars.compile(
      document.getElementById('items-template').innerHTML
    );

    Rx.DOM.keyup(textInput)
      .pluck('target', 'value')
      .filter(function (text) { return text.length > 0; })
      .debounce(1000 /* 1 second */)
      .distinctUntilChanged()
      .flatMapLatest(searchWikipedia)
      .subscribe(function (data) {
        results.innerHTML = template(data[1]);
      });
  }

  Rx.DOM.ready().subscribe(main);
}());
