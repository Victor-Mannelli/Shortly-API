import { nanoid } from "nanoid";
import * as urlService from "../services/urlService.js";

export async function shortenUrl(req, res) {
	const url = req.body.url;
	const user = res.locals.user;
	try {
		shortenUrl = {
			shortUrl: nanoid(8),
		};
		await urlService.shortenUrl({ url, shortenUrl, user });
		res.status(201).send(shortenUrl);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
export async function urlFilter(req, res) {
	try {
		const filteredUrl = await urlService.filteredUrl(req.params.id);
		const response = {
			id: filteredUrl.rows[0].link_id,
			shortUrl: filteredUrl.rows[0].short_link,
			url: filteredUrl.rows[0].link,
		};

		res.status(200).send(response);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
export async function openShortUrl(req, res) {
	try {
		await urlService.addVisitors(req.params.shortUrl);
		const url = await urlService.getUrl(req.params.shortUrl)
		res.redirect(url.rows[0].link)
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
