const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')

const mongoose = require("mongoose");
const db =
  "mongodb+srv://irineub:Irineu09@eventsdb.0dceun4.mongodb.net/eventsdb";

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((error) => {
    console.error("Erro connecting to db !", error);
  });

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user
    .save()
    .then((registeredUser) => {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token});
    })  
    .catch((error) => {
      console.log(error);
    });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email })
    .then((user) => {
      if (!user) {
        res.status(401).send("Invalid email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid Password");
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/events", (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Tech Conference",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "date": "2023-07-10T09:30:00.000Z"
    },
    {
      "_id": "3",
      "name": "Art Exhibition",
      "description": "Nulla vitae elit libero, a pharetra augue.",
      "date": "2023-08-05T14:00:00.000Z"
    },
    {
      "_id": "4",
      "name": "Music Festival",
      "description": "Sed posuere consectetur est at lobortis.",
      "date": "2023-09-15T19:00:00.000Z"
    },
    {
      "_id": "5",
      "name": "Fashion Show",
      "description": "Vestibulum id ligula porta felis euismod semper.",
      "date": "2023-10-20T16:30:00.000Z"
    },
    {
      "_id": "6",
      "name": "Food Expo",
      "description": "Curabitur blandit tempus porttitor.",
      "date": "2023-11-12T11:00:00.000Z"
    },
    {
      "_id": "7",
      "name": "Film Festival",
      "description": "Aenean lacinia bibendum nulla sed consectetur.",
      "date": "2023-12-05T10:00:00.000Z"
    },
    {
      "_id": "8",
      "name": "Sports Tournament",
      "description": "Fusce dapibus, tellus ac cursus commodo.",
      "date": "2024-01-18T14:45:00.000Z"
    },
    {
      "_id": "9",
      "name": "Business Summit",
      "description": "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      "date": "2024-02-29T09:00:00.000Z"
    },
    {
      "_id": "10",
      "name": "Technology Expo",
      "description": "Maecenas sed diam eget risus varius blandit sit amet non magna.",
      "date": "2024-03-14T13:15:00.000Z"
    }
  ];
  
  res.json(events);
});
router.get("/special", (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "New Year's Eve Party",
      "description": "Celebrate the arrival of the new year with a fantastic party.",
      "date": "2023-12-31T21:00:00.000Z"
    },
    {
      "_id": "2",
      "name": "Charity Gala Dinner",
      "description": "An elegant evening to raise funds for a worthy cause.",
      "date": "2024-02-15T18:30:00.000Z"
    },
    {
      "_id": "3",
      "name": "Fashion Week",
      "description": "Discover the latest trends and designs in the fashion industry.",
      "date": "2024-04-10T10:00:00.000Z"
    },
    {
      "_id": "4",
      "name": "Music Awards",
      "description": "Recognizing outstanding achievements in the music industry.",
      "date": "2024-06-20T19:30:00.000Z"
    },
    {
      "_id": "5",
      "name": "Food and Wine Festival",
      "description": "Indulge in a wide array of culinary delights and exquisite wines.",
      "date": "2024-08-05T12:00:00.000Z"
    },
    {
      "_id": "6",
      "name": "Tech Startup Pitch Competition",
      "description": "Witness the future of technology as innovative startups showcase their ideas.",
      "date": "2024-09-18T15:00:00.000Z"
    },
    {
      "_id": "7",
      "name": "Film Premiere",
      "description": "Be among the first to watch an eagerly anticipated movie release.",
      "date": "2024-11-02T19:00:00.000Z"
    },
    {
      "_id": "8",
      "name": "Sports Charity Tournament",
      "description": "Join athletes and celebrities for a day of friendly competition and fundraising.",
      "date": "2025-01-12T10:30:00.000Z"
    },
    {
      "_id": "9",
      "name": "Art Auction",
      "description": "Bid on extraordinary artworks from renowned artists around the world.",
      "date": "2025-03-08T17:00:00.000Z"
    },
    {
      "_id": "10",
      "name": "Conference on Artificial Intelligence",
      "description": "Explore the latest advancements and applications of AI technology.",
      "date": "2025-05-20T09:00:00.000Z"
    }
  ];
  
  res.json(events);
});

module.exports = router;
