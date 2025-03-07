import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

class DbClient {
  constructor() {
    // Verificar que el archivo .env se cargó correctamente
    if (Object.keys(process.env).length === 0) {
      throw new Error(
        "No environment variables loaded. Make sure .env file exists."
      );
    }

    const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

    // Validar variables de entorno
    if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
      console.error("\n❌ Missing environment variables:");
      if (!DB_USER) console.error("- DB_USER is missing");
      if (!DB_PASSWORD) console.error("- DB_PASSWORD is missing");
      if (!DB_HOST) console.error("- DB_HOST is missing");
      if (!DB_NAME) console.error("- DB_NAME is missing");

      throw new Error("Missing required environment variables");
    }

    this.uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=MarketNode`;
    this.dbName = DB_NAME;
    this.client = null;
    this.db = null;

    // Log de configuración (sin mostrar la contraseña)
    console.log("\n📝 Database Configuration:");
    console.log(`- User: ${DB_USER}`);
    console.log(`- Host: ${DB_HOST}`);
    console.log(`- Database: ${DB_NAME}`);
    console.log(`- URI: mongodb+srv://${DB_USER}:****@${DB_HOST}`);
  }

  async connect() {
    try {
      console.log("\n🔄 Attempting to connect to MongoDB Atlas...");

      // Validar formato de URI
      if (!this.uri.startsWith("mongodb+srv://")) {
        throw new Error("Invalid MongoDB URI format");
      }

      this.client = await MongoClient.connect(this.uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 1,
      });

      this.db = this.client.db(this.dbName);

      // Verificar que podemos acceder a la base de datos
      await this.db.command({ ping: 1 });
      console.log("✅ MongoDB Atlas Connected Successfully");

      return this.db;
    } catch (error) {
      console.error("\n❌ Connection Error Details:");
      console.error(`- Error Name: ${error.name}`);
      console.error(`- Error Message: ${error.message}`);
      if (error.code) console.error(`- Error Code: ${error.code}`);

      // Sugerencias específicas basadas en el tipo de error
      if (error.message.includes("Authentication failed")) {
        console.log(
          "\n💡 Suggestion: Your username or password might be incorrect"
        );
      } else if (error.message.includes("ENOTFOUND")) {
        console.log(
          "\n💡 Suggestion: Cannot resolve the host. Check your internet connection and DB_HOST value"
        );
      } else if (error.message.includes("timed out")) {
        console.log(
          "\n💡 Suggestion: Connection timed out. Check your internet connection or MongoDB Atlas status"
        );
      }

      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      try {
        await this.client.close();
        console.log("✅ MongoDB Atlas Disconnected Successfully");
        this.client = null;
        this.db = null;
      } catch (error) {
        console.error("❌ Error during disconnect:", error.message);
      }
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }
}

const dbClient = new DbClient();

export default dbClient;
