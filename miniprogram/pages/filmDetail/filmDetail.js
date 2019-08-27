// pages/filmDetail/filmDetail.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
film:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfilmDetail(options.id)
  },
  getfilmDetail(id){
    wx.showLoading({
      title: 'Loading...',
    })
    db.getfilmDetail(id).then(res=>{
      wx.hideLoading()
        //console.log(res)
        const data=res.result
        if (data){
          this.setData({
            film:data
          })
          this.getmythisReview(data._id)
        }else{
        setTimeout(()=>wx.navigateBack,2000)
      }
    }).catch(err=>{
      console.log(err)
      wx.hideLoading()
      setTimeout(()=>wx.navigateBack,2000)
    })  
  },
  openActionsheet(){
    var that=this
    wx.showActionSheet({
      itemList: ['文字', '语音'],
      success(res) {
        if(res.tapIndex == 0){
          wx.navigateTo({
            url: '/pages/reviewEdit/reviewEdit?text=0&id='+that.data.film._id,
          })
        }
        if(res.tapIndex == 1){
          wx.navigateTo({
            url: '/pages/reviewEdit/reviewEdit?text=1&id=' + that.data.film._id,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
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
  getmythisReview(id){
    db.getmythisReview(id).then(res=>{
      console.log(res)
      if (res.result.data.length){
        const data=res.result.data[0]
        this.setData({
          id:data._id,
          filmId:data.filmId
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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