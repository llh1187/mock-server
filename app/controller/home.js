'use strict';
const interfaceEndNameArr = require('../../config/interface');
const Controller = require('egg').Controller;
/**
 * 
 * @param {*} ctx 
 * @returns flag 判断是否符合后缀
 */
const judgeMatchFlag = ctx => {
  const { request = {} } = ctx;
  const { originalUrl = {} } = request;
  // 获取后缀 正则表达式获取
  const reg = /(.*)\.(.*)/;
  const arr = reg.exec(originalUrl) || [''];
  const suffix = arr[arr.length - 1];
  const flag = interfaceEndNameArr.some(item => item === suffix);
  return flag;
}
/**
 *  1、获取到请求的接口 .lgx结尾或者.fun结尾 这个可以配置化
 *  2、请求合法，判断文件夹内是否有该接口名字定义的文件 todo lo
 */
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async handleRequest() {
    const { ctx = {} } = this;
    // 后缀是否匹配
    const matchFlag = judgeMatchFlag(ctx);
    // 不匹配 走原流程 todo lo 这里怎么走原流程？
    if (!matchFlag) {
      ctx.body = 'hhh todo';
      return;
    }
    // 匹配 走mock流程

    ctx.body = 'test!!!!';
  }
}

module.exports = HomeController;
