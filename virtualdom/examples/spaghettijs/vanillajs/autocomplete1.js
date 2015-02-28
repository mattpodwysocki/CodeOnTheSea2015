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

  function main() {
    var textInput = document.getElementById('textInput');
    var results = document.getElementById('results');

    textInput.addEventListener('keyup', function (e) {
      searchWikipedia(e.target.value, function (data) {
        clearContent(results);
        addAllContent(results, data[1]);
      });
    });
  }

  ready(main);
}());
