const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * 检查用户电子邮箱是否已存在
 * @param {object} req - 请求对象
 * @param {object} res - 响应对象
 * @param {function} next - 下一步中间件函数
 */
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "失败！用户名已被使用！"
      });
      return;
    }

    // 检查电子邮箱是否存在
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "失败！电子邮件已在使用中！"
        });
        return;
      }

      next();
    });
  });
};

/**
 * 检查角色是否有效
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "失败！角色不存在： " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
