const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class AuthController {
  async login(ctx, next) {
    console.log(123, jwt.sign)
    // console.log(1, PRIVATE_KEY)
    const { id, name } = ctx.user;
    console.log(1, id, name)
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    console.log(6, token)
    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}

module.exports = new AuthController();
