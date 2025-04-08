import { upsertUser } from './prismaFunctions';

// Example of manually sending data with id and name
const sendData = async () => {
  const userId = 1;  // Replace this with the ID you want to update or create
  const userName = 'John Doe'; // Replace this with the name you want to set

  await upsertUser(userId, userName); // Call the upsert function
};

sendData();
