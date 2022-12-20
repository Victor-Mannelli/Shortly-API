import * as userSchemas from "../schemas/userSchemas.js";
import * as repository from "../repositories/userRepository.js";

export async function validateSignUp(req, res, next) {
	const { error } = userSchemas.signUpSchema.validate(req.body, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors); // unprocessable entity
	}
	try {
		const result = await repository.checkEmail(req.body.email)
		if (result.rows.length !== 0) {
			return res.status(409).send({ message: "Email already registered" });
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}

	next();
}
