import express from "express";
import usuarioRoutes from "./routes/users.routes";

const app = express();
app.use(express.json());
app.use("/api", usuarioRoutes);

export default app;
