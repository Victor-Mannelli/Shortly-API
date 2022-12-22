import connection from "../database/database.js";

export async function findUserId(token) {
	return await connection.query(
		"SELECT user_id FROM sessions WHERE token = $1",
		[token]
	);
}
export async function getUserData(user_id) {
	return await connection.query(
		`SELECT 
        u.user_id as id,
        u.username as name,
        SUM(l.visitors) as "visitCount",
        json_agg(jsonb_build_object('id', l.link_id, 'shortUrl', l.short_link, 'url', l.link, 'visitCount', l.visitors)) as "shortenedUrls"
        FROM users AS u
        JOIN links AS l ON u.user_id = l.user_id
        WHERE u.user_id = $1
        GROUP BY u.user_id`,
		[user_id]
	);
}
