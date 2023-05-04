import fetch from "node-fetch";
import { config } from "dotenv";


//App configuration
config();
const url = `http://ehospital:8080/ehospital`;

export default class medicalUnit {
  static async addAccess(req, res) {
    try {
      const response = await fetch(`${url}/AddAccessServlet`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...req.body }),
      });
      const datas = await response.json();
      console.log(datas);
      if (datas) {
        return res.status(200).json({ datas });
      } else {
        throw new Error(datas.message);
      }
    } catch (err) {
      if (res.statusCode === 500) {
        return res
          .status(500)
          .json({ message: "internal server error", error: err });
      }
      return res.status(400).json({ message: err.message, error: err });
    }
  }

  static async addDesc(req, res) {
    try {
      const response = await fetch(`${url}/AddDescriptionServlet`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...req.body }),
      });
      const datas = await response.json();
      console.log(datas);
      if (datas) {
        return res.status(200).json({ datas });
      } else {
        throw new Error(datas.message);
      }
    } catch (err) {
      if (res.statusCode === 500) {
        return res
          .status(500)
          .json({ message: "internal server error", error: err });
      }
      console.log(err);
      return res.status(401).json({ message: "401 unauthorized", error: err });
    }
  }

  static async downloadCSV(req, res) {
    try {
      const response = await fetch(`${url}/DownloadCSVServlet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
  
      const csv = await response.text();
  
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=data.csv");
      res.send(csv);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
}
