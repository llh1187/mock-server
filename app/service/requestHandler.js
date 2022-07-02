'use strict';
const Service = require('egg').Service
const fs = require('fs')
const path = require("path");
const util = require('../extend/interfaceNameRelated');
const { getRelativePath } = util;
const prefix = require('../../config/serverUrlConfig').relativeUrl;

class requestHandler extends Service {
  /**
   * 1 先通过mock文件夹获取同名的接口数据
   * 当存在时，直接获取返回
   * 不存在 转发请求（todo）
   * @returns {Object}
   */
  async handleMock(name) {
    const { body, header } = await this.getMockData(name);
    return {
      body,
      header,
    };
  }
  async getMockData(name) {
    const { ctx, config } = this;
    const {record} = config;
    let data = { body: {}, header: {} };
    // todo lo 怎么拿到config里面的数据？
    if(record) {
      const path = getRelativePath(ctx);
      // 不存在 转发请求
      data = await this.getRealData(path);
      // 将请求返回的数据保存在本地mock文件夹下
      this.writeToFile(name, data);
      return data;
    }
    const filePath = path.join(__dirname, `../../mock/${name}.json`);
    try {
      // todo lo 听说用流的性能更好
      data = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(data);
    } catch (err) {
      console.error(err);
      // 处理请求路径
      const path = getRelativePath(ctx);
      // 不存在 转发请求
      data = await this.getRealData(path);
      // 将请求返回的数据保存在本地mock文件夹下
      this.writeToFile(name, data);
    }
    return data;
  }
  async writeToFile(name, data) {
    const filePath = path.join(__dirname, '../../mock/');
    fs.writeFile(`${filePath}${name}.json`, JSON.stringify(data, null, 2), { flag: 'w' }, err => {
      if (err) {
        console.error(err);
        return;
      }
    })
  }
  async getRealData(path) {
    const { ctx } = this;
    const fullPath = `${prefix}${path}`;
    let data = { body: {}, header: {} };
    // 转发请求 获取返回
    try {
      const result = await ctx.curl(fullPath, {
        method: 'POST', // todo lo
        data: ctx.request.body,
        headers: ctx.request.headers,
        contentType: 'json',
        // 自动解析 JSON response
        dataType: 'json',
        // 10 秒超时
        timeout: 10000,
      });
      console.log(result);
      data = {
        header: result.headers,
        body: result.data,
      };
    } catch (err) {
      console.log(err);
    }
    return data;
  }
}
module.exports = requestHandler;
