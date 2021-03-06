[![npm package](https://nodei.co/npm/aligns.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aligns/)

[![build status](https://secure.travis-ci.org/mike442144/aligns.png)](https://travis-ci.org/mike442144/aligns)
[![Coverage Status](https://coveralls.io/repos/github/mike442144/aligns/badge.svg?branch=master)](https://coveralls.io/github/mike442144/aligns?branch=master)
[![Dependency Status](https://david-dm.org/mike442144/aligns/status.svg)](https://david-dm.org/mike442144/aligns)
[![NPM download][download-image]][download-url]
[![NPM quality][quality-image]][quality-url]

[quality-image]: http://npm.packagequality.com/shield/aligns.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=aligns
[download-image]: https://img.shields.io/npm/dm/aligns.svg?style=flat-square
[download-url]: https://npmjs.org/package/aligns

# Aligns
A tool to align array or table

# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
  + [Align an array](#align-an-array)
  + [Align a table](#align-a-table)
* [API](#api)
  + [Align.left(indent, xs)](#alignleftindent-xs)
  + [Align.right(indent, xs)](#alignrightindent-xs)
  + [Align.center(indent, xs)](#aligncenterindent-xs)
  + [Align.tableL(xss)](#aligntablelxss)
  + [Align.tableR(xs)](#aligntablerxs)
  + [Align.table(xs)](#aligntablexs)

## Installation

```bash
$ npm install aligns
```
## Usage
### Align an array

```javascript
const align = require('aligns');

const xs = ['Ludwig van Beethoven', 'Beyond', 'Michael Jackson', 'Wolfgang Amadeus Mozart'];
const aligned = align.left(0, xs);

/*
[ 'Ludwig van Beethoven   ',
  'Beyond                 ',
  'Taylor Swift           ',
  'Wolfgang Amadeus Mozart' ]
*/
```

### Align a table
```javascript
const align = require('aligns');

const xss = [
  ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart'],
  ['Symphony No.9 in D minor op.125', 'Le nozze di Figaro K.492'],
  ['Symphony No.5 in C minor op.67', 'Serenade No.13 K.525']
];
const aligned = align.tableL(xss);

/*
[ [ 'Ludwig van Beethoven           ','Wolfgang Amadeus Mozart ' ],
  [ 'Symphony No.9 in D minor op.125','Le nozze di Figaro K.492' ],
  [ 'Symphony No.5 in C minor op.67 ','Serenade No.13 K.525    ' ] ]
*/

```

## API

### Align.left(indent, xs)
 * `indent`  <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)\>
 * `xs`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\>

Align an array of String to left.
 
### Align.right(indent, xs)
 * `indent`  <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)\>
 * `xs`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\>

Align an array of String to right.
 
### Align.center(indent, xs)
 * `indent`  <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)\>
 * `xs`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\>

Align an array of String to center.
 
### Align.tableL(xss)
 * `xss`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\> 2D array of String

Align each column to left.
 
### Align.tableR(xs)
 * `xss`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\> 2D array of String
 
 Align each column to right.
 
### Align.table(xs)
 * `xss`  <[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\> 2D array of String
 
 Align each column to center.
