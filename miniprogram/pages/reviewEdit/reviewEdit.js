 // pages/reviewEdit/reviewEdit.js
const db = require('../../utils/db')
const util = require('../../utils/util')
const radio = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var recordTimeInterval;
Page({
  data: {
    film:{},
    reviewContent:"",
    userInfo: null,
    isText:[] ,
    text: 0,
    record: 0, //未录音
    formatedRecordTime: '00:00',
    keep: true,
    recordTime: 0,
    musicUrl:"" //录音地址
  },
  onLoad: function (options) {
    console.log(options)
    this.isRecord(options)
    this.getfilmDetail(options.id)
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
    
  },
  isRecord(options){
    this.setData({
      text: options.text,
    })
    if (options.text == 0) {
      this.setData({
        isText: [{ value: "文字", name: 0, checked: 'true' }, { value: "录音", name: 1 }]
      })
    }
    else {
      this.setData({
        isText: [{ value: "文字", name: 0 }, { value: "录音", name: 1, checked: 'true' }]
      })
    }
  },
  getfilmDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getfilmDetail(id).then(res => {
      wx.hideLoading()
      console.log(res)
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
  onInput(event){
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },
  addReview(event) {
    let content = this.data.reviewContent
    if (!this.data.musicUrl && !content) return
    //console.log(this.data.userInfo)
    
    const musicUrl=this.data.musicUrl.replace(/\=/g,"等于")
    console.log(musicUrl)
    wx.navigateTo({
    url: '/pages/reviewPreview/reviewPreview?text=' + this.data.reviewContent + "&musicUrl=" + musicUrl  + "&image=" + this.data.film.image + "&name=" + this.data.film.name + "&avatar=" + this.data.userInfo.avatarUrl + "&nickName=" + this.data.userInfo.nickName + "&id=" + this.data.film._id + "&filmImage=" + this.data.film.image + "&filmName=" + this.data.film.name + "&filmTypes=" + this.data.film.types + "&filmIntro=" + this.data.film.intro + "&duration=" + this.data.duration
    })
  
  },

  radioChange: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  startRecord: function () {
    var that = this
    this.setData({ record: 1 })
    recordTimeInterval = setInterval(function () { //计算时分秒
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTimeR(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)
    const options = {
      duration: 30000, //录音
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3'
    }
    radio.start(options); //开始录音
    radio.onStart((res => {
      console.log('监听录音', res)
    }));//监听录音事件
  },
  //暂停录音
  keep() {
    radio.resume();
    this.setData({ keep: false })
    clearInterval(recordTimeInterval);
  },
  //继续录音
  pause() {
    var that = this
    this.setData({ keep: true, })
    recordTimeInterval = setInterval(function () { //计算时分秒
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTimeR(that.data.recordTime),
        recordTime: recordTime
      })
  
    }, 1000)
  },
  //结束录音
  stopRecord: function () {
    console.log('录音结束了')
    var that = this;
    clearInterval(recordTimeInterval);
    radio.stop(); //录音结束
    radio.onStop((res) => { //录音结束
      //that.stopRecord
      console.log('录音结束', res);
      this.setData({
        record: res.tempFilePath,
        musicUrl: res.tempFilePath, //录音音频
        duration: res.duration, //音频时长时间戳
        record: true,
      })
      
    })
  },
  //取消录音
  remove() {
    radio.stop(); //结束录音
    this.setData({ record: 0, recordTime: 0, play: false })
    clearInterval(recordTimeInterval);
  },
  playVoice() {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = this.data.musicUrl
    this.innerAudioContext.play()
  },
})