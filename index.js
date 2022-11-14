const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const auth = require("./libs/auth");

//routers
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const profileRouter = require("./routers/profile");
const transactionRouter = require('./routers/transaction')

require("./db/db");

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(postRouter);
app.use(profileRouter);
app.use('/transaction',transactionRouter)

app.listen(port, () => console.log(`Server running on port:${port}`));
