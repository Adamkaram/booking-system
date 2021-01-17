"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.signIn = signIn;
exports.signOut = signOut;

var _init = _interopRequireWildcard(require("./init"));

var _token = require("./token");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function signUp(_ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email,
      password = _ref.password;
  return _init["default"].post('/auth/sign-up', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }).then(function (res) {
    var token = res.data.token;
    (0, _init.setToken)(token);
    return (0, _token.getDecodedToken)();
  });
} // Sends a POST request to /auth on the server, with the email & password returning the JWT
// Belonging to the user with supplied credentials


function signIn(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;
  return _init["default"].post('/auth', {
    email: email,
    password: password
  }).then(function (res) {
    var token = res.data.token;
    (0, _init.setToken)(token);
    return (0, _token.getDecodedToken)();
  })["catch"](function (res) {
    if (res.response.status === 400 || res.response.status === 401) {
      alert("There was an error with your email or password. Please try again.");
    }
  });
}

function signOut() {
  (0, _init.setToken)(null);
}