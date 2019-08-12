const MemoryFileSystem = require("memory-fs");
const fs = new MemoryFileSystem();

fs.mkdirpSync("/a/test/dir");
fs.writeFileSync("/a/test/dir/file.txt", "Hello World");
fs.readFileSync("/a/test/dir/file.txt"); // returns Buffer("Hello World")

// Async variants too
fs.unlink("/a/test/dir/file.txt", function(err) {
  // ...
});

fs.readdirSync("/a/test"); // returns ["dir"]
fs.statSync("/a/test/dir").isDirectory(); // returns true
fs.rmdirSync("/a/test/dir");

fs.mkdirpSync("C:\\use\\windows\\style\\paths");
