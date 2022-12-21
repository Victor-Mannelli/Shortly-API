import connection from "../database/database.js";

export async function checkAuthHeader(token) {
	return await connection.query("SELECT * FROM sessions WHERE token = $1", [
		token,
	]);
}

export async function shortenUrl({ url, shortenUrl, user }) {
	await connection.query(
		`INSERT INTO links (user_id, link, short_link, visitors) VALUES ($1, $2, $3, $4)`,
		[user.rows[0].user_id, url, shortenUrl.shortUrl, 0]
	);
}

export async function urlFilter(id) {
	return await connection.query("SELECT * FROM links WHERE link_id = $1", [id]);
}
