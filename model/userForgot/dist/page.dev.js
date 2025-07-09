"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userForgotSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var UserForgot = _mongoose["default"].models.UserForgot || _mongoose["default"].model("UserForgot", userForgotSchema);

var _default = UserForgot;
exports["default"] = _default;