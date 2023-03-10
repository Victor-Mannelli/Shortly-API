import * as urlRepository from "../repositories/urlRepository.js";

export async function shortenUrl({ url, shortenUrl, user }) {
	try {
		await urlRepository.shortenUrl({ url, shortenUrl, user });
	} catch (error) {
		console.log(error);
		return;
	}
}
export async function filteredUrl(id) {
	try {
		return await urlRepository.urlFilter(id);
	} catch (error) {
		console.log(error);
		return;
	}
}
export async function addVisitors(shortUrl) {
	try {
		await urlRepository.addVisitors(shortUrl);
	} catch (error) {
		console.log(error);
		return;
	}
}
export async function getUrl(shortUrl) {
	try {
		return await urlRepository.getUrl(shortUrl);
	} catch (error) {
		console.log(error);
		return;
	}
}
export async function deleteUrl(id) {
	try {
		return await urlRepository.deleteUrl(id);
	} catch (error) {
		console.log(error);
		return;
	}
}
