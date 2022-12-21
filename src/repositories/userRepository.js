import connection from "../database/database.js";

export async function checkEmail(email) {
	return await connection.query(`SELECT * FROM users WHERE email = $1`, [
		email,
	]);
}

export async function createNewUser({ email, username, hashedPassword }) {
	await connection.query(
		`INSERT INTO users (email, username, password, created_at) VALUES ($1, $2, $3, $4)`,
		[email, username, hashedPassword, Date.now()]
	);
}

export async function login({ userId, token }) {
	await connection.query(
		`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`,
		[userId, token]
	);
}
