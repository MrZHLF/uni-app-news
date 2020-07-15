'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	let {
		user_id,
		author_id
	} = event
	const user = await db.collection('user').doc(user_id).get()
	const author_likes_ids = user.data[0].author_likes_ids
	
	let author_ids = null
	if(author_likes_ids.includes(author_id)) {
		// 取消关注
		author_ids = dbCmd.pull(author_id)
	} else {
		// 关注
		author_ids = dbCmd.addToSet(author_id)
	}
	
	await db.collection('user').doc(user_id).update({
		author_likes_ids:author_ids
	})
	
	return {
		code:200,
		msg:"更新成功"
	}
};
