import * as urlSchemas from "../schemas/urlSchemas.js";
import * as repository from "../repositories/urlRepository.js";

export async function validateUrl(req, res, next) {
	const { error } = urlSchemas.urlSchema.validate(req.body, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	const header = req.headers.authorization;
	if (!header) {
		return res.status(401).send({ message: "Missing authorization header" });
	}
	try {
		const token = header.replace("Bearer ", "");
		const user = await repository.checkAuthHeader(token);
		if (user.rows.length === 0) {
			res
				.status(401)
				.send({ message: "No user found with received auth token" });
			return;
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
	res.locals.user = user;
	next();
}
export async function validateUrlFilter(req, res, next) {
	const { error } = urlSchemas.idParamsSchema.validate(req.params, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}
	try {
		const shortenUrl = await repository.urlFilter(req.params.id);
		if (shortenUrl.rows.length === 0) {
			return res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
	next();
}
export async function validateShortUrl(req, res, next) {
	const { error } = urlSchemas.shortUrlSchema.validate(req.params, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const shortUrl = await repository.checkShortUrl(req.params.shortUrl);
		if (shortUrl.rows.length === 0) {
			return res.status(404).send({ message: "This shortUrl doesn't exist" });
		}

		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
export async function validateDeletion(req, res, next) {
	const { error } = urlSchemas.idParamsSchema.validate(req.params, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	const header = req.headers.authorization;
	if (!header) {
		return res.status(401).send({ message: "Missing authorization header" });
	}
	try {
		const token = header.replace("Bearer ", "");
		const userId = await repository.getUserByToken(token);

		const checkUrlById = await repository.urlFilter(req.params.id);
		if (checkUrlById.rows.length === 0) {
			return res.status(404).send({message:"Id doesn't correspond to any stored url"});
		}
		const linkOwnedByUser = await repository.checkOwnership({
			user_id: userId.rows[0].user_id,
			link_id: req.params.id,
		});
		if (linkOwnedByUser.rows.length === 0) {
			return res.status(401).send({ message: "User doesn't own this link" });
		}
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
