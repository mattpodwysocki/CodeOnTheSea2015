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

  var List = Backbone.Collection.extend({

  });

  var ResultsView = Backbone.View.extend({
    model: List,
    initialize: function(){
      this.render();
    },
    render: function () {
      var template = _.template($("#search_template").html(), this.model);
      this.$el.html( template );
    }
  });

  var InputView = Backbone.View.extend({
    events: {
      'keyup': 'onInput'
    },
    onInput: function() {
      this.model.set('result', this.el.val());
    }
  });

  $(function () {
    var list = new List('foo','bar','baz');

    var inputView = new InputView({
      el: $('#textInput'),
      model: ''
    });
    var resultsView = new ResultsView({
      el: $('#results'),
      model: list
    });
  })
}());
