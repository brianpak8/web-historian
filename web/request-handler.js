var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  // console.log(req.url, 'URL');
  // console.log(archive.paths.archivedSites, '/www.google.com.html?');
 
  if (req.methond === 'GET' && req.url !== '/') {
    archive.isUrlInList(req.url, function (boolean) {
      if (boolean) {
        httpHelpers.serveAssets(res, req.url, function(err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file ${req.url}`);
          } else {
            res.writeHead(200, httpHelpers.headers);
            res.end(data);
          }
        });
      }



    });
  }
    

  if (req.method === 'GET' && req.url === '/') {
    httpHelpers.serveAssets(res, req.url, function(err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file ${req.url}`);
      } else {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      }
    });
  }
  











//  USE BELOW LATER
//res.end(archive.paths.list);
};
