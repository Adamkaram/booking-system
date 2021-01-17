"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rememberToken = rememberToken;
exports.getValidToken = getValidToken;
exports.getDecodedToken = getDecodedToken;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// For storing the logged in user's credentails across page refreshes
var key = 'userToken';

function rememberToken(token) {
  if (token) {
    // store the token
    localStorage.setItem(key, token);
  } else {
    // Clear token from local storage
    localStorage.removeItem(key);
  }
}

function getValidToken() {
  var token = localStorage.getItem(key);

  try {
    var decodedToken = (0, _jwtDecode["default"])(token); // valid token

    var now = Date.now() / 1000; // check if token has expired

    if (now > decodedToken.exp) {
      return null;
    }

    return token;
  } catch (error) {
    // invalid token
    return null;
  }
}

function getDecodedToken() {
  var validToken = getValidToken();

  if (validToken) {
    return (0, _jwtDecode["default"])(validToken);
  } else {
    return null;
  }
}