"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setToken = setToken;
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _token = require("./token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseURL = process.env.REACT_APP_API_URL; // Create an axios instance

var api = _axios["default"].create({
  baseURL: baseURL
});

function setToken(token) {
  // saves token to local storage
  (0, _token.rememberToken)(token);

  if (token) {
    // Setting the Authorisation header for all future GET requests
    api.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
} // Validates token, and removes it if it's invalid


setToken((0, _token.getValidToken)());
var _default = api;
exports["default"] = _default;