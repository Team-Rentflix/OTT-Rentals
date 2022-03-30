const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRouter = require("./routers/user");
const auth = require("./libs/auth");

require("./db/db");

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.listen(port, () => console.log(`Server running on port:${port}`));
