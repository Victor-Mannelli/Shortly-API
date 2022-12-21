import * as urlRepository from "../repositories/urlRepository.js";

export async function shortenUrl({ url, shortenUrl, user }) {
	try {
		await urlRepository.shortenUrl({ url, shortenUrl, user });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
