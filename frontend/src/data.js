import { genimgs } from './genimgs.js';

export const data = [
  {
    user: "John",
    time: "2021-04-02T12:10:10",
    text: "Lorem ipsum",
    media: [
      {
        title: "selfie1",
        url: genimgs[0],
        type: "img/jpeg"
      }, {
        title: "selfie2",
        url: genimgs[1],
        type: "img/jpeg"
      }
    ],
    comments: [
      {
        user: "Lilly",
        text: "Some text",
        time: "2021-04-12T16:00:10",
      },
      {
        user: "Paul",
        text: "Other text",
        time: "2021-04-11T20:20:00",
      }
    ],
    likes: [
      {
        user: "Tom",
        type: "thumb"
      },{
        user: "Ellie",
        type: "heart"
      }
    ],
    tags: [
      "Lilly",
      "Tom"
    ]
  }, {
    user: "Marie",
    time: new Date((new Date()).setDate(new Date().getDate() - 1)),
    text: "Ate a cookie",
    media: [
      {
        title: "selfie1",
        url: genimgs[3],
        type: "img/jpeg"
      }, {
        title: "selfie2",
        url: genimgs[2],
        type: "img/jpeg"
      }
    ],
    comments: [
      {
        user: "Eric",
        text: "WOW",
        time: new Date((new Date()).setHours(new Date().getHours() - 2))
      },
      {
        user: "Paul",
        text: "LOL",
        time: new Date((new Date()).setHours(new Date().getHours() - 1))
      },      {
        user: "Lilly",
        text: "Mmmmm",
        time: new Date((new Date()).setMinutes(new Date().getMinutes() - 30))
      },
      {
        user: "Larry",
        text: "POW",
        time: new Date((new Date()).setMinutes(new Date().getMinutes() - 10))
      }
    ],
    likes: [
      {
        user: "Paul",
        type: "thumb"
      },{
        user: "Ellie",
        type: "heart"
      }
    ],
    tags: [
      "Larry",
      "Paul"
    ]
  },
];
