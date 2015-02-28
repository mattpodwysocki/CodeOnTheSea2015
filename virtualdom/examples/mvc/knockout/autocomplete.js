(function () {

  function koToRx(element) {
    return Rx.Observable.create(function (observer) {
      var subscription = element.subscribe(function (newValue) {
        observer.onNext(newValue);
      });

      return subscription.dispose.bind(subscription);
    });
  }

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

  function ViewModel() {
    this.textInput = ko.observable('');
    this.results = ko.observableArray([]);
    this.results.extend({ rateLimit: 50 });
    this.store = new Store();
    this.init();
  }

  ViewModel.prototype.init = function () {
    koToRx(this.textInput)
      .debounce(1000)
      .distinctUntilChanged()
      .flatMapLatest(this.store.find.bind(this.store))
      .subscribe(this.populate.bind(this));
  };

  ViewModel.prototype.populate = function(data) {
    this.results.removeAll();

    var results = data[1];
    for(var i = 0, len = results.length; i < len; i++) {
      this.results.push(results[i]);
    }
  }

  $(function () {
    var vm = new ViewModel();
    ko.applyBindings(vm);
  });

}());
