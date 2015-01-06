var url = require('url');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');

module.exports = function(app) {
  app.get('/sitemap/index.xml.gz', function(req, res) {
    var siteMapFile = publicDir + 'index.xml.gz';
    //fs.exists(siteMapFile, function(exists) {
    //if (!exists) {
    generateSitemapIndex(req.headers.host, siteMapFile, function(success) {
      if (success) {
        res.type('gzip');
        res.sendfile(siteMapFile);
      }
    });
    //}
    //else {
    //  res.sendfile(siteMapFile);
    //}
  });

  app.get('/sitemap/:id.xml.gz', function(req, res) {
    var id = req.params.id;
    var siteMapFile = publicDir + id + '.xml.gz';

    //fs.exists(siteMapFile, function(exists) {
    //if (!exists) {

    generateSitemap(id, req.headers.host, siteMapFile, function(success) {
      if (success) {
        res.type('gzip');
        res.sendfile(siteMapFile);
      }
    });
    //}
    //else {
    //  res.sendfile(siteMapFile);
    //}
    //});
  });

  var MaxSitemapUrls = 10000;

  function generateSitemapIndex(host, siteMapFile, cb) {
    var url;
    var priority = 0.5;
    var freq = 'monthly';
    var xml = '<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    var siteMap = {};
    var slug;
    var dateModified;

    var options = {
      sort: {
        id: 1
      }
    };

    return Events.find({}, options, function(err, evs) {
      var numSiteMaps = Math.floor(evs.length / MaxSitemapUrls);
      if (numSiteMaps < 1) {
        numSiteMaps = 1;
      }

      for (var i = 1; i <= numSiteMaps; i++) {
        //dateModified = post.dateModified;
        url = 'http://' + host + '/sitemap/' + i + '.xml.gz';
        xml += '<sitemap>';
        xml += '<loc>' + url + '</loc>';
        //xml += '<lastmod>' + dateModified + '</lastmod>';
        //xml += '<changefreq>' + freq + '</changefreq>';
        //xml += '<priority>' + priority + '</priority>';
        xml += '</sitemap>';
      }

      xml += '</sitemapindex>';

      zlib.gzip(xml, function(_, result) { // The callback will give you the 
        fs.writeFile(siteMapFile, result, function(err) {
          if (err) {
            console.log(err);

          } else {
            if (typeof cb == "function") cb(true);
          }
        }); // result, so just send it.
      });
    });
  }

  function generateSitemap(id, host, siteMapFile, cb) {
    var from = MaxSitemapUrls * (id - 1);

    var options = {
      limit: MaxSitemapUrls,
      skip: from,
      sort: {
        id: 1
      }
    };

    return Events.find({}, options, function(err, evs) {
      if (err) return;

      var url;
      var priority = 0.5;
      var freq = 'monthly';
      var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

      var ev = {};
      var slug;

      var date;
      var month;
      var day;

      for (var i = 0; i < evs.length; i++) {
        ev = evs[i];
        //date = new Date(post.dateModified);
        //month = ('0' + date.getMonth() + 1).slice(-2);
        //day = ('0' + date.getDate()).slice(-2);

        //date = date.getFullYear() + '-' + month + '-' + day;
        url = 'http://' + host + '/' + ev.slug + '/' + ev.eid;

        xml += '<url>';
        xml += '<loc>' + url + '</loc>';
        //xml += '<lastmod>' + date + '</lastmod>';
        //xml += '<changefreq>' + freq + '</changefreq>';
        //xml += '<priority>' + priority + '</priority>';
        xml += '</url>';
      }

      xml += '</urlset>';

      zlib.gzip(xml, function(_, result) { // The callback will give you the 
        fs.writeFile(siteMapFile, result, function(err) {
          if (err) {
            console.log(err);

          } else {
            if (typeof cb == "function") cb(true);
          }
        }); // result, so just send it.
      });
    });
  }
}