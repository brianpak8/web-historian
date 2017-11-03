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
  
  if (req.method === 'POST') {
    console.log(req.method);
    let body = [];
    
    req.on('data', (chunk) => {
      console.log(chunk, 'AHHHHHHHHHHHH');
      body.push(chunk);
    }).on('end', () => {
      console.log('~!!!!!!!!!!!!!', body);
      body = Buffer.concat(body).toString();
      // var statusCode = 302;
      // body = JSON.parse(body);
      // body.objectId = nextId;
      archive.addUrlToList(body.substring(4), function() {
        httpHelpers.serveAssets(res, '/loading.html', function(err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file ${link}`);
          } else {
            res.writeHead(302, httpHelpers.headers);
            res.end(data);
          }
        });
      });
    });
    
    // console.log(req.url, 'POOOOOOOOOOOOOOOOOOST')
    // console.log(req);
  }
  
  
  if (req.method === 'GET' && link !== '/') {
    archive.isUrlArchived(link, function(boolean, url) {
      if (boolean) {
        httpHelpers.serveAssets(res, link, function(err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file ${link}`);
          } else {
            res.writeHead(200, httpHelpers.headers);
            res.end(data);
          }
        });
      } else if (link.substring(0, 4) !== 'www.') {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      } else { /// site is not archived, and is a valid link
        
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
};
