'use strict';
const interfaceEndNameArr = require('../../config/interface');
const getOriginUrlFunc = ctx => {
  const { request = {} } = ctx;
  const { originalUrl = {} } = request;
  return originalUrl;
}
/**
 * 
 * @param {*} ctx 
 * @returns flag 判断是否符合后缀
 */
const judgeMatchFlag = ctx => {
  const originalUrl = getOriginUrlFunc(ctx);
  // 获取后缀 正则表达式获取
  const reg = /(.*)\.(.*)/;
  const arr = reg.exec(originalUrl) || [''];
  const suffix = arr[arr.length - 1];
  const flag = interfaceEndNameArr.some(item => item === suffix);
  return flag;
}
const getName = ctx => {
  const originalUrl = getOriginUrlFunc(ctx);
  // 获取后缀 正则表达式获取
  const reg = /(.*)\.(.*)/;
  const arr = reg.exec(originalUrl) || [''];
  const urlWithInterFace = arr[1]||'';
  const lastIndexSlash = urlWithInterFace.lastIndexOf('/');
  const interfaceName = urlWithInterFace.slice(lastIndexSlash+1);
  return interfaceName;
}
module.exports = { judgeMatchFlag, getName };
