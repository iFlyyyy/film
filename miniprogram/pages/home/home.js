// miniprogram/pages/home/home.js
const db = require('../../utils/db')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films:[],
    film:0
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getReviews()
  },
  random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  },
  getReviews(callback){
    db.getReviews().then(res=>{
      const film=this.random(0,res.data.length - 1) 
      
      this.setData({
        films:res.data,
        film
      })
      console.log(film)
      console.log(this.data.films)
      if (callback) {
        callback()
      }
    })
    
  },
  onPullDownRefresh() {
    this.getReviews(() => wx.stopPullDownRefresh())   
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