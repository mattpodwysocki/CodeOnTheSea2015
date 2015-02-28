(function () {

  function ready(callback) {
    if (document.readyState === 'complete') {
      setTimeout(callback, 0);
    } else {
      document.addEventListener( 'DOMContentLoaded', callback, false );
      window.addEventListener( 'load', callback, false );
    }
  }

  var destroy = (function () {
    var trash = document.createElement('div');
    return function (element) {
      trash.appendChild(element);
      trash.innerHTML = '';
    };
  })();

  var jsonpRequest = (function () {
    var uniqueId = 0;
    var defaultCallback = function _defaultCallback(cb, data) {
      cb(data);
    };

    return function (settings, callback) {
      typeof settings === 'string' && (settings = { url: settings });
      !settings.jsonp && (settings.jsonp = 'JSONPCallback');

      var head = document.getElementsByTagName('head')[0] || document.documentElement,
        tag = document.createElement('script'),
        handler = 'rxjscallback' + uniqueId++;

      if (typeof settings.jsonpCallback === 'string') {
        handler = settings.jsonpCallback;
      }

      settings.url = settings.url.replace('=' + settings.jsonp, '=' + handler);

      var existing = window[handler];
      window[handler] = function(data, recursed) {
        if (existing) {
          existing(data, true) && (existing = null);
          return false;
        }
        defaultCallback(callback, data);
        !recursed && (window[handler] = null);
        return true;
      };

      var cleanup = function _cleanup() {
        tag.onload = tag.onreadystatechange = null;
        head && tag.parentNode && destroy(tag);
        tag = undefined;
      };

      tag.src = settings.url;
      tag.async = true;
      tag.onload = tag.onreadystatechange = function (_, abort) {
        if ( abort || !tag.readyState || /loaded|complete/.test(tag.readyState) ) {
          cleanup();
        }
      };
      head.insertBefore(tag, head.firstChild);
    };
  })();

  function searchWikipedia (term, callback) {
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
      + encodeURIComponent(term) + '&callback=JSONPCallback';
    return jsonpRequest(url, callback);
  }

  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      var callNow = !timeout;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Add debounce
  // Add distinct only and not blank
  function main() {
    var textInput = document.getElementById('textInput');
    var results = document.getElementById('results');
    var template = Handlebars.compile(
      document.getElementById('items-template').innerHTML
    );

    var previousValue = '';

    textInput.addEventListener('keyup', debounce(function (e) {
      var newValue = e.target.value;

      if (newValue !== previousValue && newValue.length > 0) {
        previousValue = newValue;

        searchWikipedia(previousValue, function (data) {
          results.innerHTML = template(data[1]);
        });
      }
    }, 1000 /* 1 second */));
  }

  ready(main);
}());
