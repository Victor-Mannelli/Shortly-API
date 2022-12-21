import { nanoid } from "nanoid";
import * as urlService from "../services/urlService.js";

export async function shortenUrl(req, res) {
    const url = req.body.url
    const user = res.locals.user
	try {
        shortenUrl = {
            shortUrl: nanoid(8),
		};
        await urlService.shortenUrl({url, shortenUrl, user });
		res.status(201).send(shortenUrl);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
