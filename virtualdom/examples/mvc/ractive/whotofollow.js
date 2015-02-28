(function () {
  // Example adapted from: http://jsfiddle.net/staltz/8jFJH/48/
// Slides:

  // Bridge between Ractive and RxJS
  Ractive.prototype.onStream = function (eventName) {
      var ractive = this;
      return Rx.Observable.fromEventPattern(
          function (h) { ractive.on(eventName, h); },
          function (h) { ractive.off(eventName, h); }
      );
  };

  // Utility
  var maxSuggestions = 3;
  function setRandomSuggestion(ractive, index) {
      var users = ractive.get('users');
      var rnd = Math.floor(Math.random() * users.length);
      ractive.set('suggestions[' + index + ']', users[rnd]);
  }

  // Create Ractive instance
  var ractive = new Ractive({
      el: 'ractive-container',
      template: '#ractive-template',
      data: { users: [], suggestions: [] }
  });

  // Refresh Event
  ractive
      .onStream('refresh')
      .startWith(null) // Simulate startup click
      .map(function() { return Math.floor(Math.random() * 500); })
      .map(function(offset) { return 'https://api.github.com/users?since=' + offset; })
      .flatMap(function(url) { return Rx.Observable.fromPromise($.getJSON(url)); })
      .subscribe(function(users) {
          ractive.set('users', users);
          for (var i = 0; i < maxSuggestions; i++)
              setRandomSuggestion(ractive, i);
      });

  // Close Event
  ractive
      .onStream('close')
      .subscribe(function(ev) { setRandomSuggestion(ractive, ev.index.i); });

}());
