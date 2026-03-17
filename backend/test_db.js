import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    fs.writeFileSync('db_success.txt', 'SUCCESS: MongoDB connected');
    process.exit(0);
  })
  .catch(err => {
    fs.writeFileSync('db_error.txt', 'FAILURE: ' + err.message + '\n' + JSON.stringify(err, null, 2));
    process.exit(1);
  });
