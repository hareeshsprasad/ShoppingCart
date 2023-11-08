import express from "express";
const session = require('express-session');
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from "./src/router";
import { indexFunction } from "./src/modules/index";
const app = express();
const Config = require("config");
const port = Config.get("port");
app.use(
  session({
    secret: 'jsuiegsbmnat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", apiRouter);
app.use("/", indexFunction);
import morganBody from "morgan-body";
morganBody(app);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
// .catch((error) => {
//   console.error('Unable to start the server:', error);
// });