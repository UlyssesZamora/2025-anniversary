import express from "express";
import connectDB from "./config/db.js";
import uploadMemoryRouter from "./routes/uploadMemory.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.148:3000",
      "192.168.1.148:3000",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.use("/api", uploadMemoryRouter);

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
