# Exploring the Reactive Extensions in JavaScript at Applicative 2015

This is the repository for the presentation [Exploring the Reactive Extensions for JavaScript](http://applicative.acm.org/speaker-MatthewPodwysocki.html) at [Applicative by the ACM 2015 conference](http://applicative.acm.org/).

## Outline

What's does a mouse drag event have in common with an Array of numbers?

The answer to this question may surprise you: they are both collections. This key insight holds the key to dramatically simplifying asynchronous programming in JavaScript. In this talk you will learn how you can use the familiar JavaScript [Array#extras](http://blogs.msdn.com/b/ie/archive/2010/12/13/ecmascript-5-part-2-array-extras.aspx) methods to create surprisingly expressive asynchronous programs. Using just a few functions, you will learn how to do the following:

- Declaratively build complex events out of simple events (ex. drag n' drop)
- Coordinate and sequence multiple Ajax requests
- Reactively update UIs in response to data changes
- Eliminate memory leaks caused by neglecting to unsubscribe from events
- Gracefully propagate and handle asynchronous exceptions

In this talk we'll be exploring the [Reactive Extensions for JavaScript (RxJS)](https://github.com/Reactive-Extensions/RxJS) library which allows us to treat events as collections. We'll also contrast RxJS with [Promises](http://en.wikipedia.org/wiki/Futures_and_promises), [CSP](http://en.wikipedia.org/wiki/Communicating_sequential_processes) and other popular approaches to building asynchronous programs in JavaScript. We'll also dive into the future with RxJS with generators, transducers, and even query transformations.

## Demos
Games:
- [Alphabet Invasion](https://github.com/Reactive-Extensions/RxJS/tree/master/examples/alphabetinvasion)
- [Bouncing Balls Using SVG + RxJS](https://github.com/angus-c/rxjs-bouncing-balls)
- [Mario Elm Example](http://fudini.github.io/rx/mario.html)

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
