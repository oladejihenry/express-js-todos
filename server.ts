import "dotenv/config";
import express from "express";
import mainRoutes from "./app/routes/mainRoutes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", async (req, res) => {
    res.send("Todo List API");
});

app.use("/api", mainRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});