
module.exports = {
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            resolve(userInfo)
          }
        })
      }).catch(() => {
        reject()
      })
    })
  },
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            //console.log("resolve")
            resolve()
          } else {
            //console.log("reject")
            reject()
          }
        }
      })
    })
  },
  formatTime(time, reg) {
    const date = typeof time === 'string' || typeof time === 'number' ? new Date(time) : time;
    const map = {};
    map.yyyy = date.getFullYear();
    map.yy = ('' + map.yyyy).substr(2);
    map.M = date.getMonth() + 1
    map.MM = (map.M < 10 ? '0' : '') + map.M;
    map.d = date.getDate();
    map.dd = (map.d < 10 ? '0' : '') + map.d;
    map.H = date.getHours();
    map.HH = (map.H < 10 ? '0' : '') + map.H;
    map.m = date.getMinutes();
    map.mm = (map.m < 10 ? '0' : '') + map.m;
    map.s = date.getSeconds();
    map.ss = (map.s < 10 ? '0' : '') + map.s;

    return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => {
      return map[$1];
    });
  },

  formatTimeR(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
  },

formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
},
  getId() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1)
  },
  
}