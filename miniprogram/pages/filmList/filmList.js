// pages/filmList/filmList.js
const db = require("../../utils/db")
Page({
  data: {
    films:[]
  },
  onLoad: function (options) {
    this.getFilms()
  },
  getFilms(callback) {
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
        if (callback) {
          callback()
        }
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  onPullDownRefresh() {
    this.getFilms(() => wx.stopPullDownRefresh())
  },
})