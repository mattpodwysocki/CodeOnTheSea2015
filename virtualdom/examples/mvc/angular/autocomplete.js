(function () {

  angular.module('AutocompleteApp', ['rx'])
  
    .factory('wikipediaFactory', function($http, rx) {

      return {
        search: function (term) {
          var deferred = $http({
            url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
            method: "jsonp",
            params: {
                action: "opensearch",
                search: term,
                format: "json"
            }
          });

          return rx.Observable
            .fromPromise(deferred)
            .map(function(response) { return response.data[1]; });
        }
      }
    })

    .controller('AutocompleteController', function($scope, wikipediaFactory) {

      function init() {
        $scope.search = '';
        $scope.results = [];

        $scope
          .$toObservable('search')
          .debounce(1000)
          .map(function(data){
              return data.newValue;
          })
          .distinctUntilChanged()
          .filter(function (text) { return text.length > 0;})
          .flatMapLatest(wikipediaFactory.search)
          .subscribe(function(val) {
            $scope.results = val;
          });
      }

      init();
    });

}());
