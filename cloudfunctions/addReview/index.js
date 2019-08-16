const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  console.log(event)
  await db.collection('review').add({
    data: {
      user,
      username: event.username,
      avatar: event.avatar,
      content: (event.content || []),
      filmId: event.id,
      createTime: +new Date(),
      musicUrl: (event.musicUrl || []),
      cloudId: (event.couldId || []),
      filmImage: event.filmImage,
      filmName: event.filmName,
      filmTypes: event.filmTypes,
      filmIntro: event.filmIntro,
    },
  })

  return {}
}