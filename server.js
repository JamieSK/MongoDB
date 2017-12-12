let express = require('express');
let app = express();

app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(3000, () => console.log('listening at 3000'));
