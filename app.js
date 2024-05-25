const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();

const app = express();

connectToDb();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/category", require("./routes/categoryRoute"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("port is running"));
