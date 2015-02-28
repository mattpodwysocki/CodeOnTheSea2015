(function () {

  function clearContent(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function addAllContent(element, contents) {
    for(var i = 0, len = contents.length; i < len; i++) {
      var li = document.createElement('li');
      li.textContent = contents[i];
      element.appendChild(li);
    }
  }

  function searchWikipedia (term) {
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
      + encodeURIComponent(term) + '&callback=JSONPCallback';
    return Rx.DOM.jsonpRequest(url);
  }

  // Debounce, distinctUntilChanged, pluck for free
  function main() {
    var textInput = document.getElementById('textInput');
    var results = document.getElementById('results');

    Rx.DOM.keyup(textInput)
      .pluck('target', 'value')
      .filter(function (text) { return text.length > 0; })
      .debounce(1000 /* 1 second */)
      .distinctUntilChanged()
      .flatMapLatest(searchWikipedia)
      .subscribe(function (data) {
        clearContent(results);
        addAllContent(results, data[1]);
      });
  }

  Rx.DOM.ready().subscribe(main);
}());
