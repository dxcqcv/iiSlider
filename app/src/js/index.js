import '../css/iiSlider';
import iiSlider from './iiSlider';



(function (  window, document, factory, undefined ) {
  if( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define( function() {
      iiSlider = factory(window, document);
      return iiSlider;
    } );
  } else if( typeof exports === 'object' && exports ) {
    // Node. Does not work with strict CommonJS.
    module.exports = factory(window, document);
  } else {
    // Browser globals.
    window.iiSlider = factory(window, document);
  }

} (  window, document, function(window, document, undefined) {
  'use strict';

  console.log(iiSlider)
  return iiSlider();

} ));
