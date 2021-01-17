"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRoomInfo = exports.formatTime = exports.endTimeSelectOptions = exports.startTimeSelectOptions = void 0;
// the <option, display:" elements for the startTime and endTime <select, display:" dropdowns
var startTimeSelectOptions = [{
  time: "8:00",
  display: "8:00am"
}, {
  time: "8:30",
  display: "8:30am"
}, {
  time: "9:00",
  display: "9:00am"
}, {
  time: "9:30",
  display: "9:30am"
}, {
  time: "10:00",
  display: "10:00am"
}, {
  time: "10:30",
  display: "10:30am"
}, {
  time: "11:00",
  display: "11:00am"
}, {
  time: "11:30",
  display: "11:30am"
}, {
  time: "12:00",
  display: "12:00pm"
}, {
  time: "12:30",
  display: "12:30pm"
}, {
  time: "13:00",
  display: "1:00pm"
}, {
  time: "13:30",
  display: "1:30pm"
}, {
  time: "14:00",
  display: "2:00pm"
}, {
  time: "14:30",
  display: "2:30pm"
}, {
  time: "15:00",
  display: "3:00pm"
}, {
  time: "15:30",
  display: "3:30pm"
}, {
  time: "16:00",
  display: "4:00pm"
}, {
  time: "16:30",
  display: "4:30pm"
}, {
  time: "17:00",
  display: "5:00pm"
}, {
  time: "17:30",
  display: "5:30pm"
}, {
  time: "18:00",
  display: "6:00pm"
}, {
  time: "18:30",
  display: "6:30pm"
}, {
  time: "19:00",
  display: "7:00pm"
}, {
  time: "19:30",
  display: "7:30pm"
}, {
  time: "20:00",
  display: "8:00pm"
}, {
  time: "20:30",
  display: "8:30pm"
}];
exports.startTimeSelectOptions = startTimeSelectOptions;
var endTimeSelectOptions = [{
  time: "8:30",
  display: "8:30am"
}, {
  time: "9:00",
  display: "9:00am"
}, {
  time: "9:30",
  display: "9:30am"
}, {
  time: "10:00",
  display: "10:00am"
}, {
  time: "10:30",
  display: "10:30am"
}, {
  time: "11:00",
  display: "11:00am"
}, {
  time: "11:30",
  display: "11:30am"
}, {
  time: "12:00",
  display: "12:00pm"
}, {
  time: "12:30",
  display: "12:30pm"
}, {
  time: "13:00",
  display: "1:00pm"
}, {
  time: "13:30",
  display: "1:30pm"
}, {
  time: "14:00",
  display: "2:00pm"
}, {
  time: "14:30",
  display: "2:30pm"
}, {
  time: "15:00",
  display: "3:00pm"
}, {
  time: "15:30",
  display: "3:30pm"
}, {
  time: "16:00",
  display: "4:00pm"
}, {
  time: "16:30",
  display: "4:30pm"
}, {
  time: "17:00",
  display: "5:00pm"
}, {
  time: "17:30",
  display: "5:30pm"
}, {
  time: "18:00",
  display: "6:00pm"
}, {
  time: "18:30",
  display: "6:30pm"
}, {
  time: "19:00",
  display: "7:00pm"
}, {
  time: "19:30",
  display: "7:30pm"
}, {
  time: "20:00",
  display: "8:00pm"
}, {
  time: "20:30",
  display: "8:30pm"
}, {
  time: "21:00",
  display: "9:00pm"
}]; // formats the time extracted from the time inputs into an array, eg 8:30 => [8, 30]

exports.endTimeSelectOptions = endTimeSelectOptions;

var formatTime = function formatTime(time) {
  var formatedTimeArray = [];
  formatedTimeArray = time.split(':').map(function (item) {
    return parseInt(item, 10);
  });
  return formatedTimeArray;
}; // Find the Room and floor number from the booking ID


exports.formatTime = formatTime;

var findRoomInfo = function findRoomInfo(roomId, roomData) {
  var roomInfo;
  roomData.forEach(function (room) {
    if (room._id === roomId) {
      roomInfo = room;
    }
  });
  return roomInfo;
};

exports.findRoomInfo = findRoomInfo;