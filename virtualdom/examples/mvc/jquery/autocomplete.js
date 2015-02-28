(function () {

  // Input View
  function InputView(opts) {
    this.changes = Rx.Observable.fromEvent(opts.element, 'keyup')
      .pluck('target', 'value')
      .debounce(1000)
      .distinctUntilChanged()
      .filter(function (x) { return x.length > 0; });
  }

  // Results View
  function ResultsView(opts) {
    this.template = opts.template;
    this.element = opts.element;
    this.results = [];
  }

  ResultsView.prototype.populate = function(data) {
    this.results = data[1];
    this.render();
  }

  ResultsView.prototype.render = function() {
    this.element.html(this.template(this.results));
  };

  // Backing repository
  function Store() {
    this.url = 'http://en.wikipedia.org/w/api.php';
    this.dataType = 'jsonp';
    this.action = 'opensearch';
    this.format = 'json';
  }

  Store.prototype.find = function (term) {
    return $.ajax({
      url: this.url,
      dataType: this.dataType,
      data: {
        action: this.action,
        format: this.format,
        search: window.encodeURI(term)
      }
    }).promise();
  };

  // Application
  var app = {
    init: function () {
      var store = new Store();

      var inputView = new InputView({
        element: $('#textInput')
      });

      var resultsView = new ResultsView({
        element: $('#results'),
        template: Handlebars.compile($('#items-template').html())
      });

      inputView.changes
        .flatMapLatest(store.find.bind(store))
        .subscribe(resultsView.populate.bind(resultsView));
    }
  };

  $(function () {
    app.init();
  });
}());
