(function () {
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

  var ResultsView = Backbone.View.extend({
    el: $('#results'),
    template: _.template( $("#search_template").html(), {} )
  })
}());
