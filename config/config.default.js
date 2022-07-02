/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1652104322676_577';

  // add your middleware config here
  config.middleware = [];
  
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    record: true, // 转发请求，并记录在mock中，而不是在mock中取值。
  };
  // 关闭安全校验
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
