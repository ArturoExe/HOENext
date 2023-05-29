import mongoose from "mongoose";

// Define the appointment schema
const AppointmentSchema = new mongoose.Schema(
  {
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    nombre: { type: String, required: true },
    servicio: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
