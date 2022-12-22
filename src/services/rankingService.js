import * as repository from "../repositories/rankingRepository.js";

export async function getRanking() {
	try {
		return await repository.getRanking();
	} catch (error) {
		console.log(error);
		return;
	}
}
