# RxJS and the Future of Web Applications at Code on the Sea 2015

This is the repository for the presentation RxJS and the Future of Web Applications at [Code on the Sea 2015](http://www.codeonthesea.com/).

## Outline

The web frontend scene is witness to many new frameworks and ways of working. It can be quite annoying when software becomes legacy quicker than ever. But actually, it's just good old innovation happening as it should, because the opportunities for improvement are there. Frameworks come and go, but what remains are the good ideas that they brought to the world. We're going to talk about the good ideas and the not so good ideas. React is one of those currently hottest frontend technologies. The new great idea in React is Virtual DOM Rendering. The gist is to frequently re-render a complete and lightweight representation of the DOM, then apply a difference filter to detect the minimum changes that need to be made to the DOM. A similar technique has existed in game development long before React: re-render the game screen in every game loop, but only update the minimum portion of the screen which changed compared to the previously rendered screen. It's hard to speak about React without mentioning Flux, because only with both together can we speak of a complete frontend architecture, since React concerns only user interfaces. Flux contains many ideas, but it can be summarized as an architecture with a unidirectional and circular flow of data. The benefit is code that is easier to follow with regard to data updates. In this talk, we'll talk about combining Reactive Programming by replacing Flux with RxJS for real reactive programming, for more complex state machines, and even explore other options including cycle.js.

## Demos
[React](http://facebook.github.io/react/) + [Rx-Flux](https://github.com/fdecampredon/rx-flux):
- [TODO MVC](https://github.com/fdecampredon/rx-flux/tree/master/examples/flux-todomvc)
- [Chat](https://github.com/fdecampredon/rx-flux/tree/master/examples/flux-todomvc)

[React](http://facebook.github.io/react/) + [Rx-React](https://github.com/fdecampredon/rx-react):
- [Autocomplete](https://github.com/fdecampredon/rx-react/tree/master/examples/autocomplete)

[Cycle.js](https://github.com/staltz/cycle)
- [TODO MVC](https://github.com/staltz/todomvc-cycle)

## Resources

Reference Material:
- [RxJS](https://github.com/Reactive-Extensions/RxJS)
- [ReactiveX.io](http://reactivex.io)
- [RxMarbles](http://rxmarbles.com/)

Blog Posts:
- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [Two Minute Introduction to RxJS](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877)
- [Reactive Programming and MVC](http://aaronstacy.com/writings/reactive-programming-and-mvc/)

Tutorials:
- [Learn RxJS](https://github.com/jhusain/learnrx)
- [RxJS Koans](https://github.com/Reactive-Extensions/RxJSKoans)

Libraries:
- [React](http://facebook.github.io/react/)
  - [Rx-React](https://github.com/fdecampredon/rx-react)
  - [Rx-Flux](https://github.com/fdecampredon/rx-flux)
  - [RxReact](https://github.com/AlexMost/RxReact)
  - [ReactiveFlux](https://github.com/codesuki/reactive-flux)
- [Ember](http://emberjs.com/)
  - [RxEmber](https://github.com/blesh/RxEmber)
- [AngularJS](https://github.com/Reactive-Extensions/rx.angular.js)
- [HTML DOM](https://github.com/Reactive-Extensions/RxJS-DOM)
- [jQuery (1.4+)](https://github.com/Reactive-Extensions/RxJS-jQuery)
- [MooTools](https://github.com/Reactive-Extensions/RxJS-MooTools)
- [Dojo 1.7+](https://github.com/Reactive-Extensions/RxJS-Dojo)
- [ExtJS](https://github.com/Reactive-Extensions/RxJS-ExtJS)
- [Cycle.js](https://github.com/staltz/cycle)

Contact Information:
- [@ReactiveX](https://twitter.com/ReactiveX)
- [@mattpodwysocki](https://twitter.com/mattpodwysocki)

# LICENSE

The MIT License (MIT)

Copyright (c) 2015 Matthew Podwysocki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
