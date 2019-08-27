// miniprogram/pages/home/home.js
const db = require('../../utils/db')
Page({
  data: {
    films:[],
    film:0
  },
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
      //console.log(film)
      //console.log(this.data.films)
      if (callback) {
        callback()
      }
    })
    
  },
  onPullDownRefresh() {
    this.getReviews(() => wx.stopPullDownRefresh())   
  },
})