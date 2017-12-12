let express = require('express');
let parser = require('body-parser');
let app = express();
let MongoClient = require('mongodb').MongoClient;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

MongoClient.connect('mongodb://localhost:27017/library', (err, database) => {
  if (err) return console.log(err);

  db = database.db('library');
  app.listen(3000, () => console.log('listening at 3000'));
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/books', (req, res) => {
  db.collection('books').find().toArray((err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});

app.post('/books', (req, res) => {
  db.collection('books').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/books');
  });
});

app.post('/books/deleteall', (req, res) => {
  db.collection('books').deleteMany({});
  res.redirect('/books');
});
