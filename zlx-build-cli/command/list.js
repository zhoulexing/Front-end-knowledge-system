const config = require("../config");
 
module.exports = () => {
     console.log(Object.values(config));
     process.exit();
}