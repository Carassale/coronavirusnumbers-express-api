import * as mongoose from 'mongoose';

interface User extends mongoose.Document {
  deviceToken: string
  endpoint?: string
  subscribedCountries: string[]
}

const UserSchema = new mongoose.Schema({
  deviceToken: String,
  endpoint: String,
  subscribedCountries: [String],
}, {
  timestamps: true,
});

const UserModel = mongoose.model<User>('User', UserSchema);

export { User, UserModel };
