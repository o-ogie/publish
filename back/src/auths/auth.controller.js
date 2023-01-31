class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }
  async postLogin(req, res, next) {
    try {
      const { userid, userpw } = req.body;
      const token = await this.authService.token({ userid, userpw });
      res.json({ token });
    } catch (e) {
        next(e)
    }
  }
}

module.exports = AuthController;
