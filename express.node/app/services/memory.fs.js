const MemoryFileSystem = require("memory-fs");
const fs = new MemoryFileSystem();


module.exports.setMemoryFs = (req, res) => {
  fs.mkdirpSync("/dir");
  fs.writeFileSync("/dir/test.txt", "Hello World!");
  
  res.set({
    'Content-type' : 'application/octet-stream',
    'Content-Disposition' : 'attachment; filename=test.txt'
  });
  
  res.send(fs.readFileSync("/dir/test.txt"));
}
