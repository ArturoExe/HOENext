import { connectDb } from "@/utils/dbCon";
import appoinment from "@/models/Appoinment";
export default async function task(req, res) {
  connectDb();

  switch (req.method) {
    case "GET":
      try {
        const appoint = await appoinment.find();
        return res.status(200).json(appoint);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

    case "POST":
      try {
        const appoint = new appoinment(req.body);
        const saved = await appoint.save();
        return res.status(201).json(saved);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    case "DELETE":
      try {
        const appoint = await appoinment.findByIdAndDelete(req.body);
        if (!appoint) return res.status(404).json("Appointment not found");
        return res.status(200).json("Appointment Deleted");
      } catch (error) {
        return res.status(400).json(error.message);
      }

    default:
      return res.status(400).json("Invalid Method");
  }
}
