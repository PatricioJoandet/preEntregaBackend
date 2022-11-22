import dotenv from 'dotenv';
dotenv.config();


const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB,
  },
  DATABASES: {
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME
    }
  }
};

export { config };