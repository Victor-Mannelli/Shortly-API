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
export async function checkShortUrl(shortUrl) {
	return await connection.query("SELECT * FROM links WHERE short_link = $1", [
		shortUrl,
	]);
}
export async function addVisitors(shortUrl) {
	await connection.query(
		"UPDATE links SET visitors = visitors + 1 WHERE short_link = $1",
		[shortUrl]
	);
}
export async function getUrl(shortUrl) {
	return await connection.query("SELECT * FROM links WHERE short_link = $1", [
		shortUrl,
	]);
}
export async function getUserByToken(token) {
	return await connection.query(
		"SELECT user_id FROM sessions WHERE token = $1",
		[token]
	);
}
export async function checkOwnership({ link_id, user_id }) {
	return await connection.query(
		"SELECT * FROM links WHERE link_id = $1 AND user_id = $2",
		[link_id, user_id]
	);
}
export async function deleteUrl(id) {
	await connection.query("DELETE FROM links WHERE link_id = $1", [id]);
}
