Page({
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
 
    sign: false,
 
    reset: true,
    nextnum: '',
    tempres: '',
    tempsign: '',
    signtable:'',
    numtable:'',
    
  },

  //点击非等于号

  clickButton: function (e) {

    var btnvalue = e.target.id; //获取按键值id
    var res = this.data.result; // 存放暂时结果
    var newDotSign = this.data.dotSign; //存放暂时小数点标志
    var newfuhao = this.data.fuhao; //存放暂时负号标志
    var newsign = this.data.sign;
    var clear = "C"; //暂时清零符号

    var opp = this.data.op;
    var overr = this.data.over;
    var overprocesss = this.data.overprocess;
    var reset = this.data.reset;

    var lastnum = this.data.lastnum;

    var tempres = this.data.tempres;
    var tempsign = this.data.tempsign;


    //按键为数字
    if (btnvalue >= '0' && btnvalue <= 9) {
      var num = btnvalue;

      //初始按键时
      if ((overr && overprocesss) || reset) {

        res = num;


        if (overr) {
          overr = false;
        }
      }
      //累计按键字符串累加
      if (!reset) {

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
      reset = false;

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
        reset = false;
      }
      //按键为清零键
      else if (btnvalue == 'clear') {
        res = '0'; //重置
        clear = "AC"; //重置
        reset = true; //重置标志
        newDotSign = false; //重置为假
        newfuhao = false; //重置为假
        opp = true;
        overr = false;
        overprocesss = false;
        tempres = '';
        tempsign = '';
        lastnum = '';

      }



      //按键为运算符
      else if (btnvalue == '+' || btnvalue == '-' || btnvalue == '*' || btnvalue == '/' || btnvalue == '%') {


        if (!newsign) {
          tempres = res;
        } else {
          lastnum = res;
        }


        switch (tempsign) {
          case '+': tempres = (tempres * 1) + (lastnum * 1);
            break;

          case '-': tempres = (tempres * 1) - (lastnum * 1);
            break;

          case '*': tempres = (tempres * 1) * (lastnum * 1);
            break;

          case '/': tempres = (tempres * 1) / (lastnum * 1);
            break;

          case '%': tempres = (tempres * 1) % (lastnum * 1);
            break;
          default:
            tempres = tempres * 1;


        }
        tempsign = btnvalue; //
        newsign = true;
        newDotSign = false; //重置小数点
        reset = true;
        res = tempres;



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
    if (res.length >= 15) {
      overr = true;
    }
    //res = (res + '').substr(0, 15); //截取
    //渲染最终数据返回
    // if (opp) {
    //   this.setData({
    //     result: res + '',
    //     dotSign: newDotSign,
    //     fuhao: newfuhao,
    //     a: clear,
    //   })
    // }
    this.setData({
      result: res + '',
      dotSign: newDotSign,
      fuhao: newfuhao,
      a: clear,
      overprocess: overprocesss,
      over: overr,
      sign: newsign,
      reset: reset,
      lastnum: lastnum,
      tempsign: tempsign,
      tempres: tempres,

    })

  },








})