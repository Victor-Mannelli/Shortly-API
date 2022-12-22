import * as service from "../services/rankingService.js"

export async function showRanking(_req, res){
    try {
        const ranking = await service.getRanking();
        console.log(ranking.rows)
        res.status(200).send(ranking.rows[0])
    } catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}