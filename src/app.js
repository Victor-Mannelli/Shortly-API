import express, { json } from "express";
import cors from "cors";
import connection from "./database/database";

const app = express();
app.use(cors());
app.use(json());

app.post("/singup", (req, res) => {
	const userInfo = req.body;

    // body = {
    //   "name": "João",
    //   "email": "joao@driven.com.br",
    //   "password": "driven",
    //   "confirmPassword": "driven"
    // }

    try {

        // erro 422 -> no joi do body
        // erro 409 -> usuário já cadastrado com o e-mail 
        // erro 422 -> Caso exista algum erro no formato do corpo enviado

        res.status(201).send({message: "User Created"})
    } catch (error) {
        res.sendStatus(422)
        console.log(error)
    }
});

app.post("/singin", (req, res) => {
    const userInfo = req.body;

    // body = {
    //   "email": "joao@driven.com.br",
    //   "password": "driven",
    // }

    try {

        // erro 401 -> Caso o usuário/senha não seja compatível/não exista
        // erro 409 -> usuário já cadastrado com o e-mail 
        // erro 422 -> Caso exista algum erro no formato do corpo enviado

        res.status(200).send(token)
    } catch (error) {
        res.sendStatus(422)
        console.log(error)
    }
})

app.post("/urls/shorten", (req, res) => {
    const auth = req.headers;
    const clientUrl = req.body;

    try {

        // Dica: Use a biblioteca nanoid para gerar as shortUrl.
        // erro 401 -> Caso o header não seja enviado ou seja inválido
        // erro 422 -> Caso exista algum erro no formato do corpo enviado

        shortenUrl = {
            "shortUrl": "identificado gerado"
        }

        res.status(201).send(shortenUrl)
    } catch (error) {
        res.sendStatus(422)
        console.log(error)
    }
})

export default app;
