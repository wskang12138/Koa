const fs = require('fs');
const momentService = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    console.log(12314254654546546)
    const userId = ctx.request.body.id;
    const content = ctx.request.body.content;
    console.log(userId, content)
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.request.body.momentId;
    console.log("id", momentId)

    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  //获取动态列表
  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;
    console.log(1, offset, size)

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    console.log(2, result)
    ctx.body = result;
  }
  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params;

    // 2.删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
}

module.exports = new MomentController();