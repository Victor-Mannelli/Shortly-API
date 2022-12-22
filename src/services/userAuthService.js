import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userAuthRepository.js";

export async function createNewUser({ email, username, password }) {
	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		await userRepository.createNewUser({ email, username, hashedPassword });
	} catch (error) {
		console.log(error);
		return
	}
}
export async function login({ userId, token }) {
	try {
		await userRepository.login({ userId, token });
	} catch (error) {
		console.log(error);
		return
	}
}
