var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!



exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    var indexPath = archive.paths.siteAssets.concat('/index.html');

    httpHelpers.serveAssets(res, indexPath, function(err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file ${indexPath}`);
      } else {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      }
    });
  }












//  USE BELOW LATER
//res.end(archive.paths.list);
};
