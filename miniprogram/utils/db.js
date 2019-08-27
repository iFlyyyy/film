const db = wx.cloud.database({
  env: 'wexinstore-k2esc'
})
const util = require('/../utils/util')
module.exports = {
  getFilms() {
    return db.collection('films').get()
  },
  getfilmDetail(id) {
    return wx.cloud.callFunction({
      name: 'filmDetail',
      data: {
        id: id
      },
    })
  },
  getfilmList(id){
    //console.log(id)
    return db.collection('films').where({
      _id: id,
    }).get()
  },
  addReview(data) {
    //console.log(data)
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addReview',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
  getReview(id) {
    //console.log(id)
    return db.collection('review').where({
      filmId:id,
    }).get()
  },
  uploadfile(path,id) {
    return wx.cloud.uploadFile({
      cloudPath: `review/${id}`,
      filePath: path,
    })
  },
  getReviewDetail(id){
    return db.collection('review').where({
      _id: id,
    }).get()
  },
  addCollect(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'collect',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
  getCollect(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getCollect',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Not collection'
        })
        return {}
      })
  },
  getCollectReview(id){
    //console.log(id)
    return db.collection('review').where({
      _id: id,
    }).get()
  },
  getmyReview() {
        return wx.cloud.callFunction({
          name: 'getmyReview'
        }) 
  },
  getReviews() {
    return db.collection('review').get()
  },
  getmythisReview(id){
    //console.log(id)
    return wx.cloud.callFunction({
      name: 'getmyReviewThis',
      data:{
        filmId:id
      }
    }) 
  }
}