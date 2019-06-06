'use strict';


module.exports =  {
  // 判断是否安装app模型
  appModel : {
    name : "app_model",
    cols : {
      USER_IP: String, // 用户ip
      USER_FLAG: Number, // 用户flag，判定是否安装，0-未安装， 1-已安装
    }
  }
};
