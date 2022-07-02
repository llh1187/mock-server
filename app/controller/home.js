'use strict';
const Controller = require('egg').Controller;
const util = require('../extend/interfaceNameRelated');
const { getName, judgeMatchFlag } = util;
/**
 *  1、获取到请求的接口 .lgx结尾或者.fun结尾 这个可以配置化
 *  2、请求合法，判断文件夹内是否有该接口名字定义的文件 todo lo
 */
class HomeController extends Controller {
  async handleRequest() {
    const { ctx = {}, service } = this;
    // 后缀是否匹配
    const matchFlag = judgeMatchFlag(ctx);
    // 不匹配 转发请求 todo lo
    if (!matchFlag) {
      ctx.body = 'hhh todo';
      return;
    }
    // 匹配 走mock流程
    // todo lo 白名单模式加入 直接转发走

    // 非白名单
    const interfaceName = getName(ctx);
    const res = await service.requestHandler.handleMock(interfaceName);
    const { header, body } = res;
    ctx.set(header);
    ctx.body = body;
  }
}

module.exports = HomeController;
