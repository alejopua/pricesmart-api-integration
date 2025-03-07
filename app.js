import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
