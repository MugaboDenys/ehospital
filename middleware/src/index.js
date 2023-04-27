import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", router);     //adding initial router

app.get("/", (req, res) => {
  res.send("Hello world");
});

//Setting the entry port
const port = 5500;

//Starting the app on configured port
app.listen(port, () =>
  console.log(`App started on port ${port}!`)
);