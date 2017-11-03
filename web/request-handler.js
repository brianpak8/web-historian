var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  // console.log(req.url, 'URL');
  // console.log(archive.paths.archivedSites, '/www.google.com.html?');
  var link = req.url;
  if (req.url[0] === '/' && link !== '/') {
    link = link.substring(1);
  }
  if (req.method === 'GET' && link !== '/') {
    console.log('first step')
    console.log(link)
    archive.isUrlArchived(link, function(boolean, url) {
      if (boolean) {
        console.log('GOT HERE!!!!!!!!!!!!!!!');
        httpHelpers.serveAssets(res, link, function(err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file ${link}`);
          } else {
            res.writeHead(200, httpHelpers.headers);
            res.end(data);
          }
        });
      }
    });
  }
    

  if (req.method === 'GET' && link === '/') {
    httpHelpers.serveAssets(res, link, function(err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file ${link}`);
      } else {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      }
    });
  }

  if (req.method === 'POST') {
    archive.isUrlInList(link, function() {
      
    })
  }
  











//  USE BELOW LATER
//res.end(archive.paths.list);
};
