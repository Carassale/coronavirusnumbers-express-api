import { User, UserModel } from '../Models/UserModel';
import BaseRepository from './BaseRepository';

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }
}
