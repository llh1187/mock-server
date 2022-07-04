'use strict';

const stateMachine = ['get', 'post']

/**
 * @param {Egg.Application} app - egg application
 * 1、收集所有请求（get post 类型）
 * 2、将请求放到下一层处理
 */
module.exports = app => {
  const { router, controller } = app;
  stateMachine.forEach(state=>{
    router[state]('/*/', controller.home.handleRequest);
  })
};
