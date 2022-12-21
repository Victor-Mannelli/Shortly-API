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

	const token = header.replace("Bearer ", "");
	const user = await repository.checkAuthHeader(token);
	if (user.rows.length === 0) {
		res.status(401).send({ message: "No user found with received auth token" });
		return;
	}
	res.locals.user = user;
	next();
}
