require('dotenv').config()
const mongoose = require('mongoose');
const Room = require('./Room')
const url = process.env.ATLAS_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

Room.create([
  // Level 8
  {
    name: 'Room 1',
    floor: '8',
    capacity: 18,
    assets: {
      pcLab: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 2',
    floor: '8',
    capacity: 18,
    assets: {
      projector: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 3',
    floor: '8',
    capacity: 18,
    assets: {
      projector: true,
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 4',
    floor: '8',
    capacity: 24,
    RoomStatus:true
  },
  {
    name: 'Room 5',
    floor: '8',
    capacity: 18,
    assets: {
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 6',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 7',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 8',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 9',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 10',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 11',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 12',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 13',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Room 14',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 15',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    },
    RoomStatus:true
  },
  {
    name: 'Studio 11',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Studio 12',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Studio 13',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Studio 14',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Studio 15',
    floor: '8',
    capacity: 18,
    RoomStatus:true
  },
  {
    name: 'Lab 01',
    floor: '8',
    capacity: 20,
    assets: {
      macLab: true
    },
    RoomStatus:true
  },
  // Level 13
  {
    name: 'Room 1',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 2',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 3',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 4',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true,
      opWalls: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 5',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 6',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 7',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 8/9',
    floor: '13',
    capacity: 40,
    assets: {
      projector: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 10',
    floor: '13',
    capacity: 16,
    RoomStatus:true
  },
  {
    name: 'Room 11',
    floor: '13',
    capacity: 20,
    RoomStatus:true
  },
  {
    name: 'Room 12',
    floor: '13',
    capacity: 20,
    RoomStatus:true
  },
  {
    name: 'Room 13',
    floor: '13',
    capacity: 20,
    assets: {
      macLab: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 14',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 15',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 16',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    },
    RoomStatus:true
  },
  {
    name: 'Room 17',
    floor: '13',
    capacity: 20,
    RoomStatus:true
  },
  {
    name: 'Room 18',
    floor: '13',
    capacity: 20,
    RoomStatus:true
  },
  {
    name: 'Green Screen Room',
    floor: '13',
    capacity: null,
    assets: {
      tv: true
    },
    RoomStatus:true
  }
])
  .then((rooms) => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch((error) => {
    console.error(error)
  })

 
  