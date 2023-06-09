import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", router);    

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = 5500;

app.listen(port, () =>
  console.log(`App started on port ${port}!`)
);