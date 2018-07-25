require.ensure(['./a'], require => {
   const b = require("./b");
   console.log(b);
});

export default "A";