var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
// reads site.txt
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      console.log(err, 'HEEEEEELOOOOO');
    } else {
      var arr = data.split('\n');
      callback(arr);
    }    
  }); 

};

exports.isUrlInList = function(url, callback) {

  exports.readListOfUrls(function (data) {   
    callback(data.some( x => x === url.substring(1)));
  });
};

exports.addUrlToList = function(url, callback /* load loading.html */) {
// add url to site.text
};

exports.isUrlArchived = function(url, callback) {
// check if site.html exist in sites folder
};

exports.downloadUrls = function(urls) {
// download html from external website and save it in sites folder
};
