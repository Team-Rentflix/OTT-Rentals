const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRouter = require("./routers/user");
const auth = require("./libs/auth");
const postRouter = require('./routers/post')

require("./db/db");

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(postRouter)

app.listen(port, () => console.log(`Server running on port:${port}`));
