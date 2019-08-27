// pages/filmDetail/filmDetail.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({
  data: {
    film:[]
  },
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
})