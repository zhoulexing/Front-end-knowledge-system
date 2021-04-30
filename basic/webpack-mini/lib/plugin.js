class Plugin {
    apply(compiler) {
        compiler.hooks.emit.tap("emit", function() {
            console.log("received emit hook.");
        });
    }
}

module.exports = Plugin;