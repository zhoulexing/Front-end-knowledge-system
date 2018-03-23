var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user: "hzjs",
    password: "qwaszx",
    connectString: "192.168.10.83:1521/hzjsdb"
  },
  function (err, connection) {
    if (err) {
      console.error("err", err.message);
      return;
    }
    console.log('Connection was successful!');
    
    connection.close(
      function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
      });
  }
);
