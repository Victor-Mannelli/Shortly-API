import joi from "joi";

export const urlSchema = joi.object({
	url: joi.string().uri().required(),
});

export const urlParamsSchema = joi.object({
	id: joi.string().required(),
});
