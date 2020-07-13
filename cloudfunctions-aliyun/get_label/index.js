'use strict';
const db = uniCloud.database() //获取数据库引用
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//获取label数据
	let {
		user_id,
		type
	} = event
	let matchObj = {}
	if(type !=='all') {
		matchObj={
			current:true
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get() //用户表
	userinfo = userinfo.data[0]
	let label = await db.collection('label').aggregate().addFields({
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	}).match(matchObj).end()
	return {
		code: 200,
		msg: "数据请求成功",
		data: label.data
	}
};
