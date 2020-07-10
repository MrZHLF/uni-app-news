'use strict';
const db = uniCloud.database() //获取数据库引用
exports.main = async (event, context) => {
	//获取label数据
  let label = await db.collection('label').get()
  return {
	  code:200,
	  msg:"数据请求成功",
	  data:label.data
  }
};
