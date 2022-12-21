import * as userSchemas from "../schemas/userSchemas.js";
import * as repository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function validateSignUp(req, res, next) {
	const { error } = userSchemas.signUpSchema.validate(req.body, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors); // unprocessable entity
	}
	try {
		const result = await repository.checkEmail(req.body.email);
		if (result.rows.length !== 0) {
			return res.status(409).send({ message: "Email already registered" });
		}

		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function validateSignIn(req, res, next) {
	const { error } = userSchemas.signInSchema.validate(req.body, {
		abortEarly: true,
	});
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const user = await repository.checkEmail(req.body.email);
		res.locals.user = user;
		if (user.rows.length === 0) {
			return res.status(401).send({ message: "This email is not registered" });
		}

		if (!bcrypt.compareSync(req.body.password, user.rows[0].password)) {
			return res.status(401).send({ message: "Password is incorrect" });
		}

		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
