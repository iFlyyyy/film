// pages/reviewDetail/reviewDetail.js
const db = require('../../utils/db')
const util=require("../../utils/util")
Page({
  data: {
    review:{},
    film:{},
    userInfo:{},
    isReview:0,
    reviewList:{},
  },
  onLoad: function (options) {
    //console.log(options)
    this.getReviewDetail(options.id)
    this.getfilmDetail(options.filmId)
    this.getmyReview(options.filmId)
    //console.log(this.data.review)
  },
  getReviewDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getReviewDetail(id).then(res => {
      wx.hideLoading()
      //console.log(res)
      const data = res.data
      if (data) {
        this.setData({
          review: data[0]
        })
      } else {
        setTimeout(() => wx.navigateBack, 2000)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      setTimeout(() => wx.navigateBack, 2000)
    })
  },
  getfilmDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getfilmDetail(id).then(res => {
      wx.hideLoading()
      //console.log(res)
      const data = res.result
      if (data) {
        this.setData({
          film: data
        })
      } else {
        setTimeout(() => wx.navigateBack, 2000)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      setTimeout(() => wx.navigateBack, 2000)
    })
  },
  playVoice() {
    //console.log(this.data.review)
    const musicUrl = this.data.review.cloudId.replace("等于", "=")
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = musicUrl
    this.innerAudioContext.play()
    
  },
  openActionsheet() {
    console.log(this.data.reviewList)
    var that = this
    if (this.data.reviewList.length){
      this.getReviewDetail(this.data.reviewList[0]._id)
    }
    else{
       wx.showActionSheet({
         itemList: ['文字', '语音'],
         success(res) {
           if (res.tapIndex == 0) {
             wx.navigateTo({
               url: '/pages/reviewEdit/reviewEdit?text=0&id=' + that.data.film._id,
             })
           }
           if (res.tapIndex == 1) {
             wx.navigateTo({
               url: '/pages/reviewEdit/reviewEdit?text=1&id=' + that.data.film._id,
             })
           }
         },
         fail(res) {
           console.log(res.errMsg)
         }
       })
    }  
  },
  getmyReview(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    //console.log(id)
    db.getmythisReview(id).then(res => {
      wx.hideLoading()
      //console.log(res)
      const data = res.result.data
      //console.log(res)
      if (data) {
        this.setData({
          reviewList: data
        })
        
      } else {
        setTimeout(() => wx.navigateBack, 2000)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      setTimeout(() => wx.navigateBack, 2000)
    })
  },
  onTapLogin(event) {

    this.setData({
      userInfo: event.detail.userInfo
    })
    console.log(event.detail.userInfo)
  },
  collect() {
    wx.showLoading({
      title: 'Submiting...'
    })

    db.addCollect({
      id: this.data.review._id
    }).then(result => {
      
      wx.hideLoading()
      const data = result.result
      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },
})