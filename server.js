const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  title: String,
  chats: [String],
});

// Create a model for items in the museum.
const chat = mongoose.model('chat', chatSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

// connect to the database
mongoose.connect('mongodb://localhost:27017/chatRoom', {
  useNewUrlParser: true
});

app.post('/api/chatTitle', async (req, res) => {
  const item = new chat({
    title: req.body.title,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/chat/:id', async (req, res) => {
  try {
    let item = await chat.findOne({
      _id: req.params.id
    });
    item.chats.push(req.body.chat);
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/chat/:id', async (req, res) => {
  try {
    let item = await chat.findOne({
      _id: req.params.id
    });
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/editTitle/:id', async (req, res) => {
  try {
    let item = await chat.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/chats', async (req, res) => {
  try {
    let items = await chat.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/chats/:id', async (req, res) => {
  try {
    await chat.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));