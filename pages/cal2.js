Page({

  /**
   * 页面的初始数据
   */
  data: {

    id1: "clear",
    id2: "+/-",
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

    result: "0", //最终结果
    dotSign: false, //最终小数点
    fuhao: false, //最终负号
    a: "AC", //最终清零符号
    op: true, //可输出标志
    sign:true,
    over: false, //溢出标志
    overprocess: false,

  },

  //点击非等于号
  clickButton: function (e) {

    var btnvalue = e.target.id; //获取按键值id
    var res = this.data.result; // 存放暂时结果
    var newDotSign = this.data.dotSign; //存放暂时小数点标志
    var newfuhao = this.data.fuhao; //存放暂时负号标志
    var newsign=this.data.sign;
    var clear = "C"; //暂时清零符号

    var opp = this.data.op;
    var overr = this.data.over;
    var overprocesss = this.data.overprocess

    var lastnum='';
    var nextnum='';
    var tempres='';
    var tempsign='';


    //按键为数字
    if (btnvalue >= '0' && btnvalue <= 9) {
      var num = btnvalue;

      //初始按键时
      if (res == '0' || res == "错误" || (overr && overprocesss)||newsign) {
        res = num;
        
        if (overr) {
          overr = false;
        }
      }
      //累计按键字符串累加
       {
        res = res + num;
        if (res.length > 14) {
          overr = true;
          overprocesss = false;
        }
        //按了负号
        if (newfuhao) {
          if (res.charAt(1) == '0' && res.charAt(2) != '%' && res.charAt(2) != '+' &&
            res.charAt(2) != '-' && res.charAt(2) != '*' && res.charAt(2) != '/' &&
            res.charAt(2) != '.') {
            res = res.replace('0', '')
          }
        }
      }


    }
    //按键为非数字
    else {
      //按键为小数点
      if (btnvalue == '.') {
        //当没有小数点标志
        if (!newDotSign) {
          res = res + '.'; //加小数点
          newDotSign = true; //设置为有小数点标志
        }
      }
      //按键为清零键
      else if (btnvalue == 'clear') {
        res = '0'; //重置
        clear = "AC"; //重置
        newDotSign = false; //重置为假
        newfuhao = false; //重置为假
        opp = true;
        overr = false;
        overprocesss = false;

      }

     

      //按键为运算符
      else if (btnvalue == '+' || btnvalue == '-' || btnvalue == '*' || btnvalue == '/' || btnvalue == '%') {
        

        if(newsign){
          tempres=res;
        }else{
          lastnum = res;
        }
        

        switch(tempsign){
          case '+': tempres = (tempres * 1) + (lastnum * 1);
          break;

          case '-': tempres = (tempres * 1) - (lastnum * 1);
            break;

          case '*': tempres = (tempres * 1) * (lastnum * 1);
            break;

          case '/': tempres = (tempres * 1) /(lastnum * 1);
            break;

          case '%': tempres = (tempres * 1) % (lastnum * 1);
            break;

        }
         tempsign = btnvalue; //
         newsign = !newsign;
         newDotSign = false; //重置小数点
         res=tempres;
         
       
      }

      //按键为取相反数
      else if (btnvalue == "+/-") {
        if (!newfuhao) {
          res = '-' + res;
        } else {
          res = ('' + res).substr(1);
          //res=res.replace('-','');
        }
        newfuhao = !newfuhao;
      }

    }
    if (res.length >= 15)
     {
      overr = true;
     }
    res = (res + '').substr(0, 15); //截取
    //渲染最终数据返回
    if (opp) {
      this.setData({
        result: res + '',
        dotSign: newDotSign,
        fuhao: newfuhao,
        a: clear,
      })
    }
    this.setData({
      overprocess: overprocesss,
      over: overr,
      sign:newsign
    })

  },


  //点击等于号
  equals: function () {
    var str = this.data.result; //暂存结果
    var strArr = []; //分割数字与字符存放到数组
    var item = ''; //暂存分割内容
    var temp = 0; //访问数组下标index
    var newfuhao = this.data.fuhao;
    newfuhao = str.charAt(0) == '-'; //暂存结果的首个字符是否为负号
    var opp = this.data.op;
    var overr = this.data.over;
    var overprocesss = this.data.overprocess



    //判断最后一个字符 当不为数字
    if (isNaN(strArr[strArr.length - 1])) {
      opp = false; // 设置为不可输出
    }

    
    res = ('' + res).substr(0, 15); //截取
    if (opp) {
      this.setData({
        result: res + "", //运算完成再转成字符
        dotSign: false, //小数点重置
        fuhao: false, //负号重置
        op: true,
      })
    }
    this.setData({
      over: overr,
      overprocess: overprocesss
    })




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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