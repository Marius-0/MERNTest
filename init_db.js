conn = Mongo();
db = conn.getDB('social_db');

db.users.drop();

db.users.insertMany([{
  accountNumber: '121290r4kvm3',
  firstName: 'Ole',
  secondName: 'Paleberg',
  displayName: 'OleOle',
  email: 'ole@email.net',
  password: '',
  groups: [],
  chats: [],
  verified: true
}, {
  accountNumber: '201295r49p9c',
  firstName: 'John',
  secondName: 'Lane',
  displayName: 'JoLa',
  email: 'jola@email.net',
  password: '',
  groups: [],
  chats: [],
  verified: true
},{
  accountNumber: '100284cdn23l',
  firstName: 'Per',
  secondName: 'Bang',
  displayName: 'banger',
  email: 'banger@email.net',
  password: '',
  groups: [],
  chats: [],
  verified: true
}, {
  accountNumber: '1704824n3frf',
  firstName: 'Tugba',
  secondName: 'Codd',
  displayName: 'tuggy',
  email: 'tug@email.net',
  password: '',
  groups: [],
  chats: [],
  verified: true
}]);

const user_01_id = (db.users.findOne({ "accountNumber": "121290r4kvm3" }))._id;

db.posts.drop();

db.posts.insertMany([{
  userID: user_01_id,
  body: "Hellos",
  media: [],
  comments: [],
  tags: []
}]);
