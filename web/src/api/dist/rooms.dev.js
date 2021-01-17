"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRooms = listRooms;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _init = _interopRequireDefault(require("./init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function listRooms() {
  return _init["default"].get('/rooms').then(function (res) {
    return res.data;
  });
}