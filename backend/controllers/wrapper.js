import BC from './baseContollerClass.js'
import baseRoute from '../routes/baseRoute.js'

import _user from '../models/usersModel.js'
import _chat from '../models/chatModel.js'
import _comment from '../models/commentModel.js'

import _group from '../models/groupModel.js'
import _link from '../models/linkModel.js'
import _media from '../models/mediaModel.js'

import _message from '../models/messageModel.js'
import _post from '../models/postModel.js'


const User = baseRoute(new BC(_user));
const Chat = baseRoute(new BC(_chat));
const Comment = baseRoute(new BC(_comment));

const Group = baseRoute(new BC(_group));
const Link = baseRoute(new BC(_link));
const Media = baseRoute(new BC(_media));

const Message = baseRoute(new BC(_message));
const Post = baseRoute(new BC(_post));

export default {
  User, Chat, Comment,
  Group, Link, Media,
  Message, Post
}