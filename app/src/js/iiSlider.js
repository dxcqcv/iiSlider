
/*
   A Slider save human eyes  
   @file iiSlider.js 
   @author Roy Shang dxcqcv@gmail.com
   @license MIT license
   Copyright (C) 2017 Roy Shang
*/

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

  const Config = {
    init(opts) {
      this.opts = Object.assign({
        wrapper: null,
        slider: null,
        prev: null,
        next: null,
        indicator: null,
        moveSpeed: 0.5,
        loopSpeed: 1000,
        auto: false
      },opts);

    },
  };

  const Indicator = {
    handleIndicator(indicatorObj) {
      this.isNext = false;
      this.isPrev = false;
      const idx = +indicatorObj.getAttribute('data-idx');
      this.tick = idx;
      this.highlightIndicator(idx);
      this.prepare(idx);
    },

    highlightIndicator(num) {
      let [indicator] = this.indicators.filter(i => i.getAttribute('data-idx') == num);
      [...indicator.parentNode.childNodes].map(i => i.classList.remove('active'));
      indicator.classList.add('active');
      return num;
    },
  };

  const Move = {
    prepare(s) {
      let children = [...this.slider.childNodes];

      let current = this.slider.childNodes[1];
      let num = current.getAttribute('data-num');
      let [show] = children.filter(li => li.getAttribute('data-num') == s );
      // just for fill
      let other = children.find(li => li.getAttribute('data-num') != s && li.getAttribute('data-num') != num );

      if(num == s) return;

      if(this.isNext || this.isPrev) {
        if(this.isNext) {
          this.reorderNext(other,current,show,this.moveRight.bind(this));
        } else {
          this.reorderPrev(show, this.moveLeft.bind(this));
        }
      } else {
        if( num < s) {
          this.reorderNext(other,current,show,this.moveRight.bind(this));
        } else {
          this.reorderPrev(show, this.moveLeft.bind(this));
        }
      }

    },

    reorderNext(prev,current,next,callback) {
      this.slider.insertAdjacentElement('afterbegin', prev);
      current.insertAdjacentElement('afterend',next);
      callback();
    },

    reorderPrev( next, callback) {
      this.slider.appendChild(this.slider.firstChild);
      this.slider.insertAdjacentElement('afterbegin', next);
      callback();
    },

    moveRight() {

      // stop it
      if(this.slider.offsetLeft === -this.slideWidth * 2) {
        this.slider.appendChild(this.slider.querySelector('li:nth-child(2)'));
        this.slider.style.transition = `left 0s`;
        this.slider.style.left = 0;
        this.isMoving = false;
        return
      }

      this.slider.style.transition = `left ${this.opts.moveSpeed}s`;
      this.slider.style.left = `-${this.slideWidth}px`;
      this.isMoving = true;

      requestAnimationFrame(this.moveRight.bind(this));
    },

    moveLeft() {

      if(this.slider.offsetLeft === 0) {
        this.slider.insertBefore(this.slider.querySelector('li:nth-child(2)'),this.slider.firstChild);
        this.slider.style.transition = `left 0s`;
        this.slider.style.left = 0;
        this.isMoving = false;
        return
      }

      this.slider.style.transition = `left ${this.opts.moveSpeed}s`;
      this.slider.style.left = `+${this.slideWidth}px`;
      this.isMoving = true;

      requestAnimationFrame(this.moveLeft.bind(this));
    },

    goto(direction) {
      if(this.isMoving === true) return;
      if(direction === 'next') {
        this.tick++;
        this.isPrev = false;
        // reset it
        if(this.tick > this.slideCount) {
          this.tick = 1;
          this.isNext = true;
        }
      } else {
        this.tick--;
        this.isNext = false;
        if(this.tick < 1) {
          this.tick = this.slideCount;
          this.isPrev = true;
        }
      }
      this.highlightIndicator(this.tick);
      this.prepare(this.tick)

    }

  };


  const iiSlider = {
    setup(opts) {
      this.init(opts);

      this.wrapper= document.getElementById(this.opts.wrapper);
      [this.slider] =this.wrapper.getElementsByClassName(this.opts.slider);
      this.slides = this.slider.querySelectorAll('li');
      this.slideCount = this.slides.length;
      [{clientWidth:this.slideWidth,clientHeight:this.slideHeight}] = this.slides;
      this.slideUlWidth = this.slideCount * this.slideWidth;
      this.prev = this.wrapper.querySelector(this.opts.prev);
      this.next = this.wrapper.querySelector(this.opts.next);
      this.indicators = [...this.wrapper.querySelectorAll(this.opts.indicator)];

      // global status
      this.tick = 1;
      this.isNext = false;
      this.isPrev = false;
      this.isMoving = false;
      this.loop;

      return this;
    },
    makeup() {

      // init
      this.wrapper.style.width = `${this.slideWidth}px`;
      this.wrapper.style.height = `${this.slideHeight}px`;

      this.slider.style.width = `${this.slideUlWidth}px`;
      this.slider.style.marginLeft = `-${this.slideWidth}px`;

      this.slider.insertBefore(this.slider.querySelector('li:last-child'),this.slider.firstChild);


    },
    build() {
      this.makeup();
      // handle indicator
      this.indicators.map(i => i.addEventListener('click',this.handleIndicator.bind(this,i)));

      this.next.addEventListener('click', this.goto.bind(this,'next'));
      this.prev.addEventListener('click', this.goto.bind(this,'prev'));

      if(this.opts.auto) {
        this.auto();
        this.wrapper.addEventListener('mouseenter',() => clearInterval(this.loop) )
        this.wrapper.addEventListener('mouseover',() => clearInterval(this.loop) )
        this.wrapper.addEventListener('mouseleave',() => this.auto() )
      }
    },

    auto() {
      this.loop = setInterval(this.goto.bind(this,'next'), this.opts.loopSpeed);
    },

  };

  // OLOO
  Object.setPrototypeOf(Move, Config);
  Object.setPrototypeOf(Indicator, Move);
  Object.setPrototypeOf(iiSlider , Indicator);

  return iiSlider ;
} ));



