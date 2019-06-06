const config = require("../config");
 
module.exports = () => {
     console.log(JSON.stringify(Object.values(config)));
     process.exit();
}