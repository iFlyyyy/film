// pages/reviewList/reviewList.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({
  data: {
    reviewList:[],
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id:options.id
    })
    this.getReview(options.id)
    
  },
  getReview(id,callback) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getReview(id).then(res => {
      wx.hideLoading()
      //console.log(res)
      const data = res.data
      if (data) {
        this.setData({
          reviewList: data.map(review => {
            review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd')
            return review
          })
        })
        console.log(data)
        if (callback) {
          callback()
        }
      } else {
        setTimeout(() => wx.navigateBack, 2000)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      setTimeout(() => wx.navigateBack, 2000)
    })
  },
  toDetail(event){
    this.setData({
      film:event.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: '/pages/reviewDetail/reviewDetail?id=' + this.data.film._id + "&filmId=" + this.data.film.filmId,
    })
  },
  onPullDownRefresh() {
    console.log("ok")
    this.getReview(this.data.id,() => wx.stopPullDownRefresh())
  },
})