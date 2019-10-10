function Otaku() {

}

function objectFactory() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    
    console.log(Constructor);
    return obj;
}

objectFactory(Otaku);