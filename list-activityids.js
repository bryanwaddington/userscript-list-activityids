// ==UserScript==
// @name         List activityids
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  List activityids in a VLE page
// @author       You
// @match        *.open.ac.uk/*
// @grant        none
// @updateURL    https://openuserjs.org/meta/bryanwaddington/My_Script.meta.js
// @license      MIT
// @copyright    2020, bryanwaddington (https://openuserjs.org/users/bryanwaddington)
// ==/UserScript==

(function() {
  'use strict';

  var html = document.getElementsByTagName('body')[0].innerHTML;
  var results = [];
  var pos;

  // Look for the 'activityid' string in the HTML
  var startFrom = 0;
  var commaPos = 0;
  for (var i = 0; i < 50; i++) {
      pos = html.indexOf('activityid', startFrom);
      if (pos === -1) {
          break;
      }

      commaPos = html.indexOf(',', pos);
      results.push({pos: pos, desc: html.substring(pos, commaPos)});
      startFrom = pos + 1;
  }

  // Look for the 'View interactive version' string in the HTML
  startFrom = 0;
  commaPos = 0;
  for (i = 0; i < 50; i++) {
      pos = html.indexOf('View interactive version', startFrom);
      if (pos === -1) {
          break;
      }

      results.push({pos: pos, desc: 'View interactive version'});
      startFrom = pos + 1;
  }

  // Sort the results by location within html var.
  results.sort(function (a, b) {
     return a.pos - b.pos;
  });

  // Print out to the console.
  results.forEach(function (value, i) {
      console.log(i + 1 + ') ', value.desc);
  });
})();