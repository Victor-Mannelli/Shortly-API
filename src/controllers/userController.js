import { v4 as uuid } from "uuid";
import * as userService from "../services/userService.js";

export async function singUp(req, res) {
	try {
		await userService.createNewUser(req.body);
		res.status(201).send({ message: "User Created" });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export async function singIn(_req, res) {
	try {
		const userId = res.locals.user.rows[0].user_id;
		const token = uuid();
		await userService.login({ userId, token });
		res.status(200).send(token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
