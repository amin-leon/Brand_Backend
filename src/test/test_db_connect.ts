import mongoose from "mongoose";


beforeAll(async () => {
    try {
      await mongoose.connect ('mongodb+srv://alvinleon1606:Alvinleon16061998@andela-cluster.pqcuqv5.mongodb.net/Test_Brand');
      console.log("Test DataBase is conected ......... ");
    } catch (error) {
      console.log("Error *** ", error);
    }
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });