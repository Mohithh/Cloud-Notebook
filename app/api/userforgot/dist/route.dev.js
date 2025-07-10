"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = void 0;

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserLogin/page"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POST = (0, _page["default"])(function _callee(req, res) {
  var body, user, encryptedPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          body = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_page2["default"].findOne({
            email: body.email
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Email not found"
          }), {
            status: 404,
            headers: {
              "content-type": "application/json"
            }
          }));

        case 9:
          // Encrypt new password
          encryptedPassword = _cryptoJs["default"].AES.encrypt(body.password, process.env.PASSWORD_SECRET_).toString(); // Update password

          user.password = encryptedPassword;
          _context.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          return _context.abrupt("return", new Response(JSON.stringify({
            success: true,
            message: "Password updated successfully"
          }), {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }));

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("FORGOT PASSWORD API ERROR:", _context.t0); // Log the error

          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Server error"
          }), {
            status: 500,
            headers: {
              "content-type": "application/json"
            }
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
exports.POST = POST;