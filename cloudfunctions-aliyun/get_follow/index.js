'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate //聚合操作符
exports.main = async (event, context) => {
	const {
		user_id
	} = event

	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	let lists = await db.collection('article').aggregate().addFields({
		is_like: $.in(['$_id', userinfo.article_likes_ids])
	}).project({
		content: 0
	}).match({
		is_like: true
	}).end()
	return {
		code:200,
		msg:"更新成功",
		data:lists.data
	}
};
