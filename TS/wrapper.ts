import { BaseRepository } from './genericController'
import { IUser } from '../models/usersModel.js'
import { IChat } from '../models/chatModel.js'

export class RepositoryWrapper{
  public User: BaseRepository<IUser>;
  public Chat: BaseRepository<IChat>;
}