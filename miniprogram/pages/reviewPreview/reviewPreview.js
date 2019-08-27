// pages/reviewPreview/reviewPreview.js
const db = require('../../utils/db')
const util = require("../../utils/util")
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options)
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
        duration: this.data.duration
    }).then(result => {
      wx.hideLoading()
      const data = result.result
      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          //console.log(this.data.id)
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
    
    const musicUrl = this.data.musicUrl.replace("等于", "=")
    console.log(musicUrl)
    　　　　this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = musicUrl
    　　　　this.innerAudioContext.play()
  },
  reEdit(){ 
wx.navigateBack({
  delta: 1
  })
  },
})