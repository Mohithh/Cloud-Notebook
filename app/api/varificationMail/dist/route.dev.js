"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(request) {
  var _ref, email, text, subject, transporter;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.json());

        case 3:
          _ref = _context.sent;
          email = _ref.email;
          text = _ref.text;
          subject = _ref.subject;

          if (!(!email || !text)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Email and message are required"
          }), {
            status: 400
          }));

        case 9:
          transporter = _nodemailer["default"].createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: "Settlesmart_solution <".concat(process.env.GMAIL_USER, ">"),
            to: email,
            subject: subject,
            text: text
          }));

        case 12:
          return _context.abrupt("return", new Response(JSON.stringify({
            success: true,
            message: "Email sent successfully!"
          }), {
            status: 200
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: _context.t0.message
          }), {
            status: 500
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}