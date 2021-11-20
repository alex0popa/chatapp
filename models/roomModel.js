import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: [true, 'Please provide a name for the room']
  }
});

export const RoomModel = mongoose.model('room', RoomSchema);
