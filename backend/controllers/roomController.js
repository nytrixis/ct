const Room = require('../models/Room');

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// @desc    Add a new room
// @route   POST /api/rooms
// @access  Public
const addRoom = asyncHandler(async (req, res) => {
  const { roomNo, floor, capacity } = req.body;

  const roomExists = await Room.findOne({ roomNo });

  if (roomExists) {
    res.status(400);
    throw new Error('Room with this number already exists');
  }

  const room = await Room.create({
    roomNo,
    floor,
    capacity,
  });

  if (room) {
    res.status(201).json({
      _id: room._id,
      roomNo: room.roomNo,
      floor: room.floor,
      capacity: room.capacity,
    });
  } else {
    res.status(400);
    throw new Error('Invalid room data');
  }
});

const getRooms = async (req, res) => {
    try {
      const rooms = await Room.find({});
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = {
  addRoom,
  getRooms,
};
