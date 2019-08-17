// miniprogram/pages/me/me.js
const util = require('../../utils/util')
const db = require('../../utils/db')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectId:{},
    reviewList:[],
    film:{},
    isMy:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollect()  
  },
  getCollect(callback){
    wx.showLoading({
      title: 'Loading',
    })
    db.getCollect().then(res => {
      wx.hideLoading()
      console.log(res)
      
      if (res.result.data) {

        const data = res.result.data
        this.setData({
          collectId: data
        })
        let reviewList = []
        for (let i=0; i<data.length ;i++) {
          db.getCollectReview(data[i].id).then(res => {
            wx.hideLoading()
            console.log(res)
            reviewList.push(res.data[0])
            this.setData({
              reviewList: reviewList.map(review => {
                review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd')
                return review
              })
            })
          })
        }
        if (callback) {
          callback()
        }
      }
      else{
        this.setData({
          reviewList:[]
        })
      }
      
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  
  toDetail(event) {
    this.setData({
      film: event.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: '/pages/reviewDetail/reviewDetail?id=' + this.data.film._id + "&filmId=" + this.data.film.filmId,
    })
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  switchReview(){
    if (this.data.isMy == 0){
      this.getmyReview()
      this.setData({
        isMy:1
      })
    }
    else{
      this.getCollect()
      this.setData({
        isMy: 0
      })
    }
  },
  getmyReview(callback){
    db.getmyReview().then(res=>{
      console.log(res)
      if (res.result.data){
        this.setData({
          reviewList:res.result.data
        })
        if (callback) {
          callback()
        }
      }
      else{
        reviewList:[]
      }
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
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
    //console.log(event.detail.userInfo)
  },
  onPullDownRefresh() {
    if (this.data.isMy == 0){
      this.getCollect(() => wx.stopPullDownRefresh())
    }
    else{
      this.getmyReview(() => wx.stopPullDownRefresh())
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})