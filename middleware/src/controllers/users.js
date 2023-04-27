import fetch from 'node-fetch';
import { config } from 'dotenv';

//App configuration
config();


const url = `http://localhost:8080/ehospital`;

export default class Users {
	static async getUsers(req, res) {
		try {
			const response = await fetch(`${url}/list-users`, {
				method: 'GET',
			});
			const datas = await response.json();
			return res.status(200).json({ message: datas.message, datas });
		} catch (err) {
			if (res.statusCode === 500) {
				return res
					.status(500)
					.json({ message: 'internal server error', error: err });
			}
			return res.status(400).json({ message: 'Unable to signup', error: err });
		}
	}

	static async addAccess(req, res) {
		try {
			const response = await fetch(`${url}/AddAccessServlet`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ ...req.body }),
			});
			const datas = await response.json();
			console.log(datas)
			if (datas) {
				return res
					.status(200)
					.json({ datas });
			} else {
				throw new Error(datas.message);
			}
		} catch (err) {
			if (res.statusCode === 500) {
				return res
					.status(500)
					.json({ message: 'internal server error', error: err });
			}
			return res.status(400).json({ message: err.message, error: err });
		}
	}
	
}