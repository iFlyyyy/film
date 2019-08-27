// pages/reviewPreview/reviewPreview.js
const db = require('../../utils/db')
const util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      nickName: options.nickName,
      text:options.text,
      name:options.name,
      musicUrl: options.musicUrl,
      image: options.image,
      avatar: options.avatar,
      id:options.id,
      filmImage: options.filmImage ,
      filmName: options.filmName ,
      filmTypes: options.filmTypes,
      filmIntro: options.filmIntro,
    })
  },

  release(){
    wx.showLoading({
      title: 'Submiting...'
    })
      const couldId = util.getId()
      if (this.data.musicUrl){
        db.uploadfile(this.data.musicUrl, couldId)
      }
      db.addReview({
        username: this.data.nickName,
        avatar: this.data.avatar,
        content:this.data.text,
        id: this.data.id,
        musicUrl: this.data.musicUrl,
      couldId: "cloud://wexinstore-k2esc.7765-wexinstore-k2esc-1259544694/review/" + couldId,
        filmImage: this.data.filmImage,
        filmName: this.data.filmName,
        filmTypes: this.data.filmTypes,
        filmIntro: this.data.filmIntro,
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          console.log(this.data.id)
          wx.navigateTo({
            url: '/pages/reviewList/reviewList?id='+this.data.id,
          })
        }, 1500)
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
  playVoice() {
    　　　　this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = this.data.musicUrl
    　　　　this.innerAudioContext.play()
  },
  reEdit(){
wx.navigateBack({
  delta: 1
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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