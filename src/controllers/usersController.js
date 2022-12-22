import * as usersService from "../services/usersService.js";

export async function returnData(req, res) {
	try {
		const userData = await usersService.getUserData(req.headers.authorization);
		res.status(200).send(userData.rows[0]);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
