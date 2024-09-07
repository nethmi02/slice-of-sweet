import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
});

const User = mongoose.model('User', UserSchema);

export default User;
