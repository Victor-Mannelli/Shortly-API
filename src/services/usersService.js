import * as repository from "../repositories/usersRepository.js";

export async function getUserData(authorization) {
	try {
		const token = authorization.replace("Bearer ", "");
        const user_id = await repository.findUserId(token)
		return await repository.getUserData(user_id.rows[0].user_id);
	} catch (error) {
		console.log(error);
        return
    }
}
