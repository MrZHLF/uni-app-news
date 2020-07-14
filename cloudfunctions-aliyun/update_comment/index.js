'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate //聚合操作符
const dbCmd = db.command //查询条件
exports.main = async (event, context) => {
	const {
		user_id, //用户id
		article_id,//文章id
		content,//评论内容
		comment_id="",//评论id
		reply_id='',//子回复id
		is_reply=false //是否子回复
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0] //用户对象
	//获取当前文章信息
	let article = await db.collection('article').doc(article_id).get()
	let comments = article.data[0].comments; //获取当前文章下的所有评论
	let commentObj = {
		comment_id:genID(5),//评论id
		comment_content:content,//评论内容
		create_time:new Date().getTime(),//创建时间
		is_reply:is_reply,//子回复
		author:{
			author_id:user.author_id,//作者id,
			author_name:user.author_name,//作者名称
			avatar:user.avatar,//作者头像
			professional:user.professional,//专业
		},
		replys:[]
	}
	
	// 评论文章
	if(comment_id === '') {
		commentObj.replys = []
		commentObj=dbCmd.unshift(commentObj)
	} else {
		// 回复文章的评论
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)  //获取评论索引
		let commentAuthor =''
		if(is_reply) {
			//子回复
			commentAuthor = comments[commentIndex].replys.find(item =>item.comment_id === reply_id)
			
		} else {
			//主回复
			// 获取作者信息
			 commentAuthor = comments.find(item =>item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor
		// 更新回复信息
		commentObj={
			[commentIndex]:{
				replys:dbCmd.unshift(commentObj)
			}
		}
	}
	
	await db.collection('article').doc(article_id).update({
		comments:commentObj
	})
	return {
		code:200,
		msg:"数据更新成功"
	}
};

function genID(length) {
	return Number(Math.random().toString().substr(3,length)+ Date.now()).toString(36)
}