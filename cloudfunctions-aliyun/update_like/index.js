'use strict';
const db = uniCloud.database() //获取数据库引用
const dbCmd = db.command
//收藏和取消收藏功能
exports.main = async (event, context) => {
  let {user_id,article_id} = event
  const userinfo = await db.collection('user').doc(user_id).get()
  const article_id_ids = userinfo.data[0].article_likes_ids
  
	let dbCmdFuns = null;
	
	if(article_id_ids.includes(article_id)) {
		// 取消收藏
		dbCmdFuns=dbCmd.pull(article_id)
	} else {
		// 收藏
		dbCmdFuns=dbCmd.addToSet(article_id)
	}
  
  await db.collection('user').doc(user_id).update({
	article_likes_ids:dbCmdFuns
  })
  return {
	  code:200,
	  msg:'数据请求成功',
	  data:userinfo.data
	  
  }
};
