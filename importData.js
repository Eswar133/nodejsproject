const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Bank = require('./models/Bank');
const Branch = require('./models/Branch');
const sequelize = require('./db');

const csvFilePath = path.join(__dirname, 'data', 'bank_branches.csv');

async function importData() {
  try {
    await sequelize.sync({ force: true }); // Recreate tables

    const banks = {};
    const branches = [];
    const bankCache = {};

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const { ifsc, bank_id, branch_name, address, city, district, state, bank_name } = row;

        if (!bankCache[bank_id]) {
          bankCache[bank_id] = { id: bank_id, name: bank_name };
        }

        branches.push({
          ifsc,
          branch: branch_name,
          address,
          city,
          district,
          state,
          bankId: bank_id,
        });
      })
      .on('end', async () => {
        try {
          // Bulk insert banks
          await Bank.bulkCreate(Object.values(bankCache), { ignoreDuplicates: true });

          // Bulk insert branches
          await Branch.bulkCreate(branches);

          console.log('CSV file successfully processed and data inserted');
        } catch (error) {
          console.error('Error during bulk insert:', error);
        }
      });
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
