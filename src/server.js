
process.on('uncaughtException', err => {
  console.log('EVENT : uncaughtException');
  console.log(err.name, err.message,err);
  process.exit(1);
});

import dotenv from 'dotenv'
dotenv.config({ path: './config.env' });
import databaseConnect from './config/databaseConnect.js';
import http from "http"



async function init(){

  await databaseConnect.createConnection(process.env.MONGO_USER_01,process.env.MONGO_PASSWORD_01,process.env.MONGO_NAMEDATABASE_01)
  const { default: app } = await import('./app.js');

  const server = http.createServer(app);
  const port = process.env.PORT || 3005


  server.listen(port,'0.0.0.0', () => {
    console.log(`App running on port ${port}...`);
  });

  process.on('unhandledRejection', err => {
    console.log('EVENT : unhandledRejection');
    console.log(err.name, err.message);
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });

}

init()