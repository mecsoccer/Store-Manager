"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validate =
/*#__PURE__*/
function () {
  function validate() {
    _classCallCheck(this, validate);
  }

  _createClass(validate, null, [{
    key: "validateTextField",
    value: function validateTextField(field, input) {
      var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var regEx = arguments.length > 4 ? arguments[4] : undefined;
      var example = arguments.length > 5 ? arguments[5] : undefined;
      var required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var message = '';
      /* istanbul ignore if */

      if (required === false) {
        message = true;
      } else if (!input) {
        message = "".concat(field, " must be included");
      } else if (input.length < min || input.length > max) {
        message = "".concat(field, " length should be between ").concat(min, " and ").concat(max);
      } else if (regEx.test(input) === false) {
        message = "wrong ".concat(field, " format. example ").concat(field, "s: ").concat(example);
      } else {
        message = true;
      }

      return message;
    }
  }, {
    key: "validateNumberField",
    value: function validateNumberField(field, input, min, max, regEx, example) {
      var required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var message = '';
      /* istanbul ignore if */

      if (required === false) {
        message = true;
      } else if (!input) {
        message = "input ".concat(field, " must be included");
      } else if (input < min || input > max) {
        message = "".concat(field, " should be a number between ").concat(min, " and ").concat(max);
      } else if (regEx.test(input) === false) {
        message = "wrong ".concat(field, " format. example ").concat(field, "s: ").concat(example);
      } else {
        return true;
      }

      return message;
    }
  }]);

  return validate;
}();

var _default = validate;
exports.default = _default;
//# sourceMappingURL=validationLibrary.js.map