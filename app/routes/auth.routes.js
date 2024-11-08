// 导入 verifySignUp 模块和 auth.controller 模块
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    // 设置跨域请求头
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // 用户注册路由
  app.post(
    "/api/auth/signup",
    [
      // 检查用户和邮箱是否已存在
      verifySignUp.checkDuplicateUsernameOrEmail,
      // 检查角色是否有效
      verifySignUp.checkRolesExisted
    ],
    // 注册新用户
    controller.signup
  );

  // 用户登录路由
  app.post("/api/auth/signin", controller.signin);
};
