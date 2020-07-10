'use strict';
const db = uniCloud.database() //获取数据库引用
const $ = db.command.aggregate
exports.main = async (event, context) => {
	let {name,page=1,pageSize=10,user_id} = event;
	// 聚合查询数据
	let matchObj = {}
	if(event.name !== '全部') {
		matchObj={
			classify:name
		}
	}
	
	const userinfo = await db.collection('user').doc(user_id).get() //用户表
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	
	let list = await db.collection('article').aggregate().addFields({
		is_like:$.in(['$_id',article_likes_ids])
	}).match(matchObj).project({content:0}).skip(pageSize*(page-1)).limit(pageSize).end()
	
 //获取label数据
 // let list = await db.collection('article').field({
	// content:false, //true只返回这个字段，false不返回
 // }).get()
 return {
 	  code:200,
 	  msg:"数据请求成功",
 	  data:list.data
 }
};
