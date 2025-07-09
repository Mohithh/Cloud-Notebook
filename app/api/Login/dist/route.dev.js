"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = void 0;

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserLogin/page"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POST = (0, _page["default"])(function _callee(req) {
  var body, user, bytes, userPassword, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(req.json());

        case 2:
          body = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(_page2["default"].findOne({
            email: body.email
          }));

        case 5:
          user = _context.sent;

          if (!user) {
            _context.next = 15;
            break;
          }

          bytes = _cryptoJs["default"].AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
          userPassword = bytes.toString(_cryptoJs["default"].enc.Utf8);

          if (!(body.password === userPassword)) {
            _context.next = 14;
            break;
          }

          token = _jsonwebtoken["default"].sign({
            success: true,
            email: body.email,
            name: user.name
          }, process.env.JWT_SECRET_, {
            expiresIn: '1d'
          });
          return _context.abrupt("return", new Response(JSON.stringify({
            success: true,
            token: token
          }), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 14:
          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Invalid password"
          }), {
            status: 401,
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 15:
          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "User not found"
          }), {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.POST = POST;