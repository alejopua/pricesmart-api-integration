import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class DbClient {
  constructor() {
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

    this.uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
    this.isConnected = false;

    // Log de configuración (sin mostrar la contraseña)
    console.log("\n📝 Database Configuration:");
    console.log(`- User: ${DB_USER}`);
    console.log(`- Host: ${DB_HOST}`);
    console.log(`- Database: ${DB_NAME}`);
    console.log(`- URI: mongodb+srv://${DB_USER}:****@${DB_HOST}`);

    // Configurar mongoose
    mongoose.set("strictQuery", false);
  }

  /**
   * Conecta a la base de datos MongoDB usando Mongoose
   * @returns {Promise<object>} Conexión de Mongoose
   */
  async connect() {
    try {
      console.log("\n📡 Conectando a MongoDB Atlas con Mongoose...");

      // Si ya está conectado, devolver la conexión existente
      if (this.isConnected && mongoose.connection.readyState === 1) {
        console.log("✅ Ya conectado a MongoDB Atlas");
        return mongoose.connection;
      }

      // Validar formato de URI
      if (!this.uri.startsWith("mongodb+srv://")) {
        throw new Error("Invalid MongoDB URI format");
      }

      // Intentar conectar con opciones
      await mongoose.connect(this.uri);

      this.isConnected = true;
      console.log("✅ Conexión a MongoDB Atlas establecida con Mongoose");

      // Eventos de conexión
      mongoose.connection.on("error", (err) => {
        console.error("❌ Error de conexión de Mongoose:", err);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        console.log("🔌 Mongoose desconectado");
        this.isConnected = false;
      });

      return mongoose.connection;
    } catch (error) {
      this.isConnected = false;

      console.error("\n❌ Error de conexión a MongoDB:");
      console.error(`- Tipo: ${error.name}`);
      console.error(`- Mensaje: ${error.message}`);
      if (error.code) console.error(`- Código: ${error.code}`);

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

  /**
   * Desconecta de la base de datos MongoDB
   */
  async disconnect() {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.disconnect();
        this.isConnected = false;
        console.log("✅ Desconexión de MongoDB Atlas exitosa");
      } catch (error) {
        console.error("❌ Error durante la desconexión:", error.message);
      }
    }
  }

  /**
   * Verifica si la conexión está establecida
   * @returns {boolean} Estado de la conexión
   */
  isDbConnected() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

const dbClient = new DbClient();

export default dbClient;
