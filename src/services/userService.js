import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository.js";

export async function createNewUser({ email, username, password }) {
	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		await userRepository.createNewUser({email, username, hashedPassword});
	} catch (error) {
		console.log(error);
	}
}