# iiSlider

[![Build Status](https://travis-ci.org/dxcqcv/iiSlider.svg?branch=master)](https://travis-ci.org/dxcqcv/iiSlider)

[![Coverage Status](https://coveralls.io/repos/github/dxcqcv/iiSlider/badge.svg?branch=master)](https://coveralls.io/github/dxcqcv/iiSlider?branch=master)

iiSlider is a lightweight, high-performant, no library dependencies cross-platform slide controller. It can help human being save eyes.

## Features

- Never move too many slide to hurt eyes
- Easy to configure 

## Demo

## Get iiSlider

#### Clone form Github

``` bash
git clone
```

#### Use npm installation

``` bash
yarn add iiSlider
```

## Started iiSlider

The easiest way of getting started is to consult our examples, please visit the [DEMOs]().

#### Creating a container

``` html
<div id="iiSlider"><a class="control_next">></a><a class="control_prev"><</a>
  <ul class="slider">
    <li data-num='1' class="slide-1">Slide 1</li>
    <li data-num='2' class="slide-2">Slide 2</li>
    <li data-num='3' class="slide-3">Slide 3</li>
    <li data-num='4' class="slide-4">Slide 4</li>
    <li data-num='5' class="slide-5">Slide 5</li>
  </ul>
  <ul class="indicator">
    <li data-idx='1' class="active"></li>
    <li data-idx='2'></li>
    <li data-idx='3'></li>
    <li data-idx='4'></li>
    <li data-idx='5'></li>
  </ul>
</div>
```
Remember must have `data-num` for every slider `li` and `data-idx` for every indicator `li`

#### Loading iiSlider

``` html
<script src="iiSlider.min.css"></script>
<script src="iiSlider.min.js"></script>
```

#### Initializing a iiSlider

``` javascript
const MySlider = Object.create(iiSlider);
MySlider.setup({
  wrapper: 'iiSlider',
  slider: 'slider',
  prev: '.control_prev',
  next: '.control_next',
  moveSpeed: 0.6,
  loopSpeed: 2000,
  auto: true,
  indicator: '.indicator > li',
});
MySlider.build();
```

## OPTIONS

The following options are available to be set for the iiSlider.

- `wrapper`
  - It is a id of the outest slider wrapper div 

- `slider`
  - It is a class of the inner slider wrapper ul 

- `prev`
  - It is a class of the left control button, must have `.` 

- `next`
  - It is a class of the right control button, must have `.` 

- `moveSpeed`
  - Speed of each slider move 

- `loopSpeed`
  - Speed of loop 

- `auto`
  - Auto loop or not 

- `indicator`
  - Children of indicator, must have `.` 

## License (MIT) 

Copyright (c) 2017 Roy Shang


