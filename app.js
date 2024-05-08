const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();

const app = express();

connectToDb();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("port is running"));
