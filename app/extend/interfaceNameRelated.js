'use strict';
const interfaceEndNameArr = require('../../config/interfaceEndName');
const whiteList = require('../../config/whiteList');
const getOriginUrlFunc = ctx => {
  const { request = {} } = ctx;
  const { originalUrl = {} } = request;
  return originalUrl;
}
const url = require("url");
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
const getRelativePath = ctx => {
  const path = ctx.request.url;
  return path;
}
const judgeWhileList = name => {
  return whiteList.includes(name);
}
module.exports = { judgeMatchFlag, getName, getRelativePath, judgeWhileList };
