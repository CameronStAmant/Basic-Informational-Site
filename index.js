let http = require('http');
let url = require('url');
let fs = require('fs');

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = '.' + q.pathname;
    if (filename === './') {
      filename = './index.html';
    }
    fs.access(filename, function (err) {
      if (err === null) {
        fs.readFile(filename, function (err, data) {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end();
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });
      } else {
        fs.readFile('./404.html', function (err, data) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });
      }
    });
  })
  .listen(8080);
