const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  console.log(user)
  await db.collection('collection').add({
    data: {
      user,
      id:event.id
    },
  })

  return {}
}