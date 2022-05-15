'use strict';
const Service = require('egg').Service
const fs = require('fs')
const path = require("path");
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
    let data = { body: {}, header: {} };
    const filePath = path.join(__dirname, `../../mock/${name}.json`);
    try {
      data = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(data);
    } catch (err) {
      // 不存在 转发请求
      console.error(err);
    }
    return data;
  }
}
module.exports = requestHandler;
