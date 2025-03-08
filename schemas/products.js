import mongoose from "mongoose";

/**
 * Esquema de Producto para MongoDB
 * Define la estructura y validaciones para los documentos de productos
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio no puede ser negativo"],
      set: (val) => Math.round(val * 100) / 100, // Redondear a 2 decimales
    },
    category: {
      type: String,
      required: [true, "La categoría es requerida"],
      enum: {
        values: ["Electrónicos", "Ropa", "Alimentos", "Hogar", "Otros"],
        message: "{VALUE} no es una categoría válida",
      },
    },
    sku: {
      type: String,
      required: [true, "El SKU es requerido"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[A-Z0-9\-]+$/.test(v);
        },
        message: (props) => `${props.value} no es un formato de SKU válido`,
      },
    },
    brand: {
      type: String,
      required: [true, "La marca es requerida"],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "El descuento no puede ser negativo"],
      max: [100, "El descuento no puede ser mayor a 100%"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
      },
    ],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productSchema);
