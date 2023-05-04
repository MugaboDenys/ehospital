import fetch from 'node-fetch';
import { config } from 'dotenv';

//App configuration
config();
const url = `http://ehospital:8080/ehospital`;

export default class Authentication {
	static async Signup(req, res) {
		try {
			const response = await fetch(`${url}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(req.body)
			});

			const datas = await response.json();
			console.log("++++++++++++++++++++",datas)
			if (datas.message.includes('successfully registered')) {
				return res
					.status(200)
					.json({ message: datas.message, data: datas.Payload });
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
	static async Login(req, res) {
		try {
			const response = await fetch(`${url}/login`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ ...req.body }),
			});
			const datas = await response.json();
			console.log(datas)
			if (datas.message.includes('Login successful')) {
				return res
					.status(200)
					.json({ message: datas.message, data: datas.Payload });
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
