(function() {

  var ractive = new Ractive({
    el: '.container',
    template: '#demo-template',
    adapt: ['RxJS']
  });

  function searchWikipedia(term) {
    var defered = $.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: term
        }
      }).promise();

    return Rx.Observable.fromPromise(defered)
      .map(function(response) { return response[1]; });
  }

  var results = Rx.Observable.fromEvent(ractive.find( '#search' ), 'click')
    .tap(function(e) { e.preventDefault(); })
    .map(function() { return ractive.find('#textInput').value; })
    .flatMapLatest(searchWikipedia);

  ractive.set( 'results', results );
}());
