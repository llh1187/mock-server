'use strict';
const Controller = require('egg').Controller;
const util = require('../extend/interfaceNameRelated');
const { getName, judgeMatchFlag } = util;
const prefix = require('../../config/serverUrlConfig').relativeUrl;

/**
 *  1、获取到请求的接口 .lgx结尾或者.fun结尾 这个可以配置化
 *  2、请求合法，判断文件夹内是否有该接口名字定义的文件 todo lo
 */
class HomeController extends Controller {
  async handleRequest() {
    const { ctx = {}, service } = this;
    // 后缀是否匹配
    const matchFlag = judgeMatchFlag(ctx);
    // 不匹配 直接转发请求
    if (!matchFlag) {
      await ctx.proxyRequest(`${prefix}`);
      return;
    }
    // 匹配 走mock流程
    const interfaceName = getName(ctx);
    const res = await service.requestHandler.handleMock(interfaceName);
    const { header, body } = res;
    ctx.set(header);
    ctx.body = body;
  }
}

module.exports = HomeController;
