const express = require('express');
const bodyParser = require('body-parser');
const Bank = require('./models/Bank');
const Branch = require('./models/Branch');
const sequelize = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const bankRoutes = require('./routes/banks');
const branchesRouter = require('./routes/branches')

app.use('/api/banks', require('./routes/banks'));
app.use('/api/branches', require('./routes/branches'));
app.use('/banks',express.static('public'));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
