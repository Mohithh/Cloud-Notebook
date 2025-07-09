"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = void 0;

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserLogin/page"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require('jsonwebtoken');

var POST = (0, _page["default"])(function _callee(req, res) {
  var body, existingUser, encryptedPassword, newUser, token;
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
            "email": body.email
          }));

        case 5:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Email already registered"
          }), {
            status: 400,
            headers: {
              "content-type": "application/json"
            }
          }));

        case 8:
          encryptedPassword = _cryptoJs["default"].AES.encrypt(body.password, process.env.PASSWORD_SECRET_).toString();
          newUser = new _page2["default"]({
            name: body.name,
            email: body.email,
            password: encryptedPassword
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(newUser.save());

        case 12:
          token = jwt.sign({
            success: true,
            email: body.email,
            name: body.name
          }, process.env.JWT_SECRET_, {
            expiresIn: '1d'
          });
          return _context.abrupt("return", new Response(JSON.stringify({
            success: true,
            token: token
          }), {
            status: 201,
            headers: {
              "content-type": "application/json"
            }
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.POST = POST;