import * as repository from "../repositories/usersRepository.js";

export async function validateUser(req, res, next) {
	const header = req.headers.authorization;
	if (!header) {
		return res.status(401).send({ message: "Missing authorization header" });
	}
	try {
		const token = header.replace("Bearer ", "");
		const userId = await repository.findUserId(token);
		if (userId.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
		}
        
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
