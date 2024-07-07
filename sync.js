const sequelize = require('./db');
const Bank = require('./models/Bank');
const Branch = require('./models/Branch');

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});
