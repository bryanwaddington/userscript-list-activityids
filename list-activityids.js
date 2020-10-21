// ==UserScript==
// @name         List activityids
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  List activityids in a VLE page
// @author       You
// @match        *.open.ac.uk/*
// @grant        GM_addStyle
// @updateURL    https://openuserjs.org/meta/bryanwaddington/My_Script.meta.js
// @license      MIT
// @copyright    2020, bryanwaddington (https://openuserjs.org/users/bryanwaddington)
// ==/UserScript==

(function () {
  'use strict';

  var body = window.top.document.getElementsByTagName('body')[0];
  var html = body.innerHTML;
  var results = [];
  var pos;

  GM_addStyle('#bw-list-activityids-results {' +
    'width: 280px;' +
    'padding: 10px;' +
    'top: 10px;' +
    'right: 10px;' +
    'background-color: lightgoldenrodyellow;' +
    'border: 1px solid #ddd;' +
    'border-radius: 5px;' +
    'z-index: 999999;' +
    'position: absolute;' +
    'box-shadow: 0px 0px 12px 1px #ccc;' +
    'font-size: 0.8rem;' +
    'font-family: Verdana, Geneva, sans-serif;' +
    '}' +

    'ol { padding-left: 20px; margin-bottom: 0; }'
  );

  // Create the results div.
  var resultsDiv = document.createElement('div');
  resultsDiv.setAttribute('id', 'bw-list-activityids-results');
  body.appendChild(resultsDiv);


  // Look for the 'activityid' string in the HTML.
  var startFrom = 0;
  var commaPos = 0;
  for (var i = 0; i < 50; i++) {
    pos = html.indexOf('activityid', startFrom);
    if (pos === -1) {
      break;
    }

    commaPos = html.indexOf(',', pos);
    results.push({
      pos: pos,
      desc: html.substring(pos, commaPos)
    });
    startFrom = pos + 1;
  }

  // Look for the 'View interactive version' string in the HTML.
  startFrom = 0;
  commaPos = 0;
  for (i = 0; i < 50; i++) {
    pos = html.indexOf('View interactive version', startFrom);
    if (pos === -1) {
      break;
    }

    results.push({
      pos: pos,
      desc: 'View interactive version'
    });
    startFrom = pos + 1;
  }

  // Sort the results by location within html var.
  results.sort(function (a, b) {
    return a.pos - b.pos;
  });

  // Print out to the console.
  var orderedList = document.createElement('ol');
  var listItem;
  results.forEach(function (value, i) {
    console.log(i + 1 + ') ', value.desc);
    listItem = document.createElement('li');
    listItem.innerText = value.desc
    orderedList.appendChild(listItem);
  });

  resultsDiv.appendChild(orderedList);

  setInterval(function () {
    var topPos = Number(window.top.document.documentElement.scrollTop) + 10
    resultsDiv.setAttribute('style', 'top: ' + topPos + 'px;');
  }, 1000);
})();