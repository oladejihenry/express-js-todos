require("dotenv").config();
const express = require("express");
const mainRoutes = require("./routes/mainRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api", mainRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});