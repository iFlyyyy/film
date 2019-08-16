// pages/filmList/filmList.js
const db = require("../../utils/db")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilms()
    console.log(this.data.films)
  },
  getFilms() {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getFilms().then(res => {
      console.log(res)
      wx.hideLoading()
      const data = res.data
      console.log(data)

      if (data.length) {
        this.setData({
          films: data
        })
        console.log(this.data.films)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
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