// pages/cal/cal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    id1: "clear",
    id2: "back",
    id3: "%",
    id4: "/",
    id5: "7",
    id6: "8",
    id7: "9",
    id8: "*",
    id9: "4",
    id10: "5",
    id11: "6",
    id12: "-",
    id13: "1",
    id14: "2",
    id15: "3",
    id16: "+",
    id17: "0",
    id18: ".",
    id19: "=",

    result: "0",
    dotSign: false,
    a: "AC",
  },

  clickButton: function(e) {

    var btnvalue = e.target.id;
    var res = this.data.result;
    var newDotSign = this.data.dotSign;
    var clear="C";
    if (btnvalue >= '0' && btnvalue <= 9) {
      var num = btnvalue;
      if (res == '0' || res == "除数不能为0") {
        res = num;
      } else {
        res = res + num;
      }
    } else {
      if (btnvalue == '.') {
        if (!newDotSign) {
          res = res + '.';
          newDotSign = true;
        }
      } else if (btnvalue == 'clear') {
        res = '0';
        clear="AC";        
        newDotSign = false;
      } else if (btnvalue == 'back') {
        var length = res.length;
        if (length > 1) {
          res = res.substr(0, length - 1);
        } else {
          res = '0';
          newDotSign = false;

        }
        if (res.charAt(res.length - 1) != '.') {
          newDotSign = false;
        }
      } else if (btnvalue == '+' || btnvalue == '-' || btnvalue == '*' || btnvalue == '/' || btnvalue == '%') {
        var sign = btnvalue;
        newDotSign = false;
        if (!isNaN(res.charAt(res.length - 1))) {
          res = res + sign;
        }

      }
    }


    this.setData({
      result: res+"",
      dotSign: newDotSign,
      a:clear,
    })
  },


  equals: function() {
    var str = this.data.result;
    var strArr = [];
    var item = '';
    var temp = 0;
    for (var i = 0; i <= str.length; i++) {
      var ch = str.charAt(i);
      var chn = str.charAt(i + 1);
      var tag1 = (ch != '' && ch >= 0 && ch <= 9) || ch == '.';
      var tag2 = (chn != '' && chn >= 0 && chn <= 9) || chn == '.';
      if (tag1) {
        item = item + ch;
        if (!tag2) {
          strArr[temp++] = item;
          item = '';
        }
      } else {
        item = ch;
       
        strArr[temp++] = item;
        item = '';
      }
    }
    if (isNaN(strArr[strArr.length - 1])) {
      strArr.pop();
    }

    var res = strArr[0] * 1;
    for (var i = 1; i < strArr.length; i += 2) {
      if (res == err) {
        break;
      }
      var num = strArr[i + 1] * 1;
      switch (strArr[i]) {
        case "+":
          res += num;
          break;
        case "-":
          res -= num;
          break;
        case "*":
          res *= num;
          break;
        case "/":
          if (num != 0) {
            res /= num;
          } else {
            var err = "除数不能为0";
            res = err;
          }
          break;
        case "%":
            res%=num;
            break;
      }
    }
    this.setData({
      result: res+"",
      dotSign: false,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})