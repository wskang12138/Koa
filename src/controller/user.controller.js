const service = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await service.create(user)
    console.log("dsfdsfdsfd", result)
    ctx.body = result
  }
}

module.exports = new UserController()