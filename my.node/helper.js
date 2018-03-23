/**
 * 后台服务帮助器，常用且不与业务逻辑相关的方法可以定义在这里
 *
 * @author  zxy
 * @date 2016-05-09
 *
 */

(function(){

  'use strict';


  module.exports = {
     schemaMapConvert : function(){
        console.log("---->invoke helper.....");
     },

     /*转成后台页码形式
     *param : {start : 1,limit : 10}
     *out : {start 10,limit : 10}
     */
     pageParamConvert : function(pageParam) {
       var page = {};
       if(!pageParam) {
         page = {start : 1,limit : 5};
       }else{
         page = pageParam;
       }
       var out = {};
       var start = page.start || 1;
       if(start < 1){
         start = 1;
       }
       var limit = page.limit || 5;
       out.start = (start - 1) * limit;
       out.limit = limit;
       return out;
     }
  }

})();



