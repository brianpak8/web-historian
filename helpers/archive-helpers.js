var fs = require('fs');
var path = require('path');
var request = require('request');
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
exports.readListOfUrls = function(callback) {
  // fs.readFile(exports.paths.list, function(err, sites) {
  //   sites = sites.toString().split('\n');
  //   if (callback) {
  //     callback(sites);
  //   }
  // });
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var arr = data.split('\n');
      callback(arr);
    }
  });
};
exports.isUrlInList = function(url, callback) {
  // exports.readListOfUrls(function(sites) {
  //   var found = _.any(sites, function(site, i) {
  //     return site.match(url);
  //   });
  //   callback(found);
  // });
  exports.readListOfUrls(function(data) {
    if (url[0] === '/') {
      callback(data.some(x => x === url.substring(1)));
    } else {
      callback(data.some(x => x === url));
    }
  });
};
exports.addUrlToList = function(url, callback) {
  // fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
  //   callback();
  // });
  exports.readListOfUrls(function(data) {
    if (!data.some((x) => url === x)) {
      fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
        callback();
      });
    } else {
      callback();
    }
  });
};
exports.isUrlArchived = function(url, callback) {
  // var sitePath = path.join(exports.paths.archivedSites, url);
  //
  // fs.access(sitePath, function(err) {
  //   callback(!err);
  // });
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('error', err);
    }
    for (var file of files) {
      if (file === url) {
        return callback(true, url);
      }
    }
    callback(false, url);
  });
};
exports.downloadUrls = function(urls) {
  // Iterate over urls and pipe to new files
  // _.each(urls, function(url) {
  //   if (!url) {
  //     return;
  //   }
  //   request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  // });
  for (var url of urls) {
    exports.isUrlArchived(url, function(boolean, link) {
      if (!boolean) {
        request('http://' + link).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + link));
      }
    });
  }
};