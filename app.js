import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";

// Configurar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba http://localhost:PORT/
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Rutas API: consulte las rutas en routes/index.js
app.use("/api", routes);

// Función para iniciar el servidor
async function startServer() {
  try {
    console.log("\n🚀 Iniciando servidor...");

    // Verificar variables de entorno necesarias
    const requiredEnvVars = ["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_NAME"];
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      console.error("\n❌ Variables de entorno faltantes:");
      missingVars.forEach((varName) => console.error(`   - ${varName}`));
      process.exit(1);
    }

    // Intentar conectar a MongoDB
    console.log("\n📡 Conectando a MongoDB Atlas...");
    await dbClient.connect();

    // Iniciar el servidor Express solo si la conexión a la BD fue exitosa
    app.listen(PORT, () => {
      console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 API disponible en http://localhost:${PORT}/api`);
      console.log("\n💡 Prueba la API con:");
      console.log(`   curl http://localhost:${PORT}/api/products`);
    });
  } catch (error) {
    console.error("\n❌ Error al iniciar el servidor:");
    console.error(`- Tipo: ${error.name}`);
    console.error(`- Mensaje: ${error.message}`);
    if (error.code) console.error(`- Código: ${error.code}`);
  }
}

// Manejar señales de terminación que se envía cuando presionas Ctrl+C en la terminal
process.on("SIGINT", async () => {
  console.log("\n👋 Cerrando servidor...");
  try {
    await dbClient.disconnect();
    console.log("✅ Desconexión exitosa");
  } catch (error) {
    console.error("❌ Error al desconectar:", error);
  }
  process.exit(0);
});

// Iniciar la aplicación
console.log("\n🎯 Iniciando API de PriceSmart...");
startServer();
