// 导入 Sequelize 库
const Sequelize = require("sequelize");

// 定义 User 模型
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    // 用户名
    username: {
      type: Sequelize.STRING
    },
    // 电子邮件
    email: {
      type: Sequelize.STRING
    },
    // 密码
    password: {
      type: Sequelize.STRING
    }
  });

  // 返回 User 模型
  return User;
};