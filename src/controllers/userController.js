import * as userService from "../services/userService.js";

export async function singUp(req, res) {
	try {
		await userService.createNewUser(req.body);
		res.status(201).send({message: "User Created"})
	} catch (error) {
		console.log(error);
	}
}
