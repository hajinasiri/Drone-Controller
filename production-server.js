const path = require('path');
const express = require('express');

const app = express();
const indexPath = path.join(__dirname, './index.html');
const publicPath = path.join(__dirname, './dist');

app.set('port', process.env.PORT || 3000);
app.use('/dist', express.static(publicPath));
app.get('/', (req, res) => res.sendFile(indexPath));

app.listen(app.get('port'), () => {
  console.log("Sarted listening on", app.get('port'));
});
