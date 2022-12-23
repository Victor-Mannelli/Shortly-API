import connection from "../database/database.js";

export async function getRanking() {
	return await connection.query(
		`SELECT 
        u.user_id as id,
        u.username as name,
        COUNT(l.link) as "linksCount",
        SUM(l.visitors) as "visitCount"
        FROM users AS u
        LEFT JOIN links AS l ON u.user_id = l.user_id
        GROUP BY u.user_id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `,
	);
}
