'use strict';

const path = require('path');
const fs = require('fs');

exports.download = function(req, res) {
  const filename = req.query.filename;
  const downloadPath = path.join(__dirname, '../../upload/', filename);
  const stats = fs.statSync(downloadPath);
  if(stats) {
    res.set({
      'Content-type' : 'application/octet-stream',
      'Content-Disposition' : 'attachment; filename='+filename,
      'Content-Length' : stats.size
    });
    fs.createReadStream(downloadPath).pipe(res);
  } else {
    res.end(404);
  }
}
