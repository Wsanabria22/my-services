import { connect, connection } from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {

  if (isConnected) {
    console.log('MongoDB is alrady connected')
    return
  }

  try {
    const db = await connect(process.env.MONGODB_URI,
      {
        dbName: 'my_services',
      })
    isConnected = true;

    console.log('MongoDB is Connected');
    console.log(db.connection.db.databaseName);
  } catch (error) {
    connection.on('error', (error) => {
      console.log('Error DB connection:', error)
    })
  };

};