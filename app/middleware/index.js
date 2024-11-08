// 导入 authJwt 模块
const authJwt = require("./authJwt");
// 导入 verifySignUp 模块
const verifySignUp = require("./verifySignUp");

// 导出一个对象，该对象包含两个属性：authJwt 和 verifySignUp
module.exports = {
  authJwt,
  verifySignUp
};