const fs = require('fs');

// const fileService = require('../service/file.service');
const utdataService = require('../service/utdata.service');
const { log } = require('console');
// const { PICTURE_PATH } = require('../constants/file-path');

class UtdataController {
  async create(ctx, next) {
    console.log("343235435435334343")
    console.log("89668875557", ctx.request.body)
    const { title, content, source_name, source_link, type, uploader, uploader_id, author, rate } = ctx.request.body;
    const result = await utdataService.create(title, content, source_name, source_link, type, uploader, uploader_id, author, rate);
    ctx.body = result;


  }
  //获取动态列表
  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { type, offset, size } = ctx.query;
    // console.log(1,type,offset,size)
    console.log(6, type, offset, size)

    // 2.查询列表
    const result = await utdataService.getUtDataList(offset, size, type);
    console.log(2, result)
    ctx.body = result;
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
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

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = "给动态添加标签成功~";
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new UtdataController();