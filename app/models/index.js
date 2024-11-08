// 导入数据配置
const config = require("../config/db.config.js");
// 导入sequelize
const Sequelize = require("sequelize");
// 创建sequelize实例
const sequelize = new Sequelize(
  config.DB,  // 数据库名称
  config.USER, // 用户名
  config.PASSWORD, // 密码
  {
    host: config.HOST, // 数据库地址
    dialect: config.dialect, // 数据库类型
    pool: {
      max: config.pool.max, // 连接池最大连接数
      min: config.pool.min, // 连接池最小连接数
      acquire: config.pool.acquire, // 连接超时时间
      idle: config.pool.idle // 链接空闲时间
    }
  }
);

// 创建一个空对象，用于存储数据库模型
const db = {};

// 将sequelize 实例添加到 db 对象中
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 导入用户模型
db.user = require("../models/user.model.js")(sequelize, Sequelize);
// 导入角色模型
db.role = require("../models/role.model.js")(sequelize, Sequelize);

// 定义用和角色之间的关系
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// 定义所有角色名称的数组
db.ROLES = ["user", "admin", "moderator"];

// 导入 db 对象
module.exports = db;
