import operateUtils from '../../utils/operateUtil'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 第一组
    id1: "clear",
    id2: "+/-",
    id3: "%",
    id4: "/",
    // 第二组
    id5: "7",
    id6: "8",
    id7: "9",
    id8: "*",
    // 第三组
    id9: "4",
    id10: "5",
    id11: "6",
    id12: "-",
    // 第四组
    id13: "1",
    id14: "2",
    id15: "3",
    id16: "+",
    // 第五组
    id17: "0",
    id18: ".",
    id19: "=",

    canDot: true,//可以输出小数点
    result: '', //最终结果
    clear: "AC", //清零符号
    lastSignIndex:-1 //上次的运算符号位置

  },

  //判断是不是数字
  isNum(num) {
    return num >= '0' && num <= '9'
  },
  //判断是不是运算符
  isSign(sign) {
    return sign == '+' || sign == '-' || sign == '*' || sign == '/' || sign == '%'
  },
  //数学除0错误
  devByZeroError() {
    wx.showToast({
      title: '除数不能为0',
      icon: 'none'
    })
    this.resetAll()
  },
  //判断是否可以输出小数点
  canWriteDot(dot, result) {
    let lastNotSign = (result != '' && !this.isSign(result[result.length - 1])) //当前不为空 并且 不是运算符
    let canDot = this.data.canDot   //可以输出小数点状态
    return dot == '.' && canDot && lastNotSign
  },
  //重置
  resetAll() {
    this.setData({
      result:'',    //清空
      canDot: true, //可以写小数点
      clear:"AC",    //already clear
      lastSignIndex:-1
    })
  },

  //点击非等于号
  clickNormalButton(e) {
    let buttonId = e.target.id //按钮的值
    let result = this.data.result //显示在页面上的值
    let lastSignIndex = this.data.lastSignIndex
    if (this.canWriteDot(buttonId, result)) { //如果是小数点并且可以输入小数点
      result = result + buttonId
      this.data.canDot = false  //写过小数点了就马上禁止再写小数点
    }
    if (this.isNum(buttonId)) { //如果是数字
      if(result[lastSignIndex+1]!='0' || !this.data.canDot){//最后的运算符的下一位不为0 或者 已经写了小数点
        console.log(lastSignIndex,'lastindex..')
        result = result + buttonId    //追加到显示屏幕上
      }
    } else if (this.isSign(buttonId)) { //如果是运算符
      if (!this.isSign(result[result.length - 1]) && this.data.result != '') { //屏幕最后一位不是运算符 则添加运算符
        result = result + buttonId
        console.log('buttonId..',buttonId)
        console.log('result',result)
        this.data.lastSignIndex = result.lastIndexOf(buttonId)
        console.log('SignIndex..',this.data.lastSignIndex)
        this.data.canDot = true   //写了运算符 则可以再写小数点了
      }
    }
    else if (buttonId == 'clear') {//如果按了清屏
      this.resetAll()
      return
    }
    else if(buttonId=='+/-'){
      console.log('+/-...')
      if(result!=''&&result[0]!='-'){
        result='-'+result
      }else if(result[0]=='-'){
        result = result.substring(1,result.length)
      }
    }
    this.setData({
      result,     //渲染到屏幕
      clear:"C"   //清屏键变为C
    })
  },

  //点击等于号
  clickEqualButton() {
    let result = this.data.result //显示的值
    let operateArr = [] //切割成将要运算的数组
    let item = "" //运算数组将要添加的每一项
    for (let i = 0; i < result.length; i++) {
      let currentNum = result[i]
      let nextNum = result[i + 1]
      if (this.isNum(currentNum)||currentNum=='.'||currentNum=='-') { //当前是数字或者小数点 则追加item
        item = item + currentNum
      }
      if (this.isSign(nextNum) || nextNum == undefined) { //下一个是运算符 则添加进运算数组
        console.log(item, 'item')
        operateArr.push(item)
        if (nextNum != undefined) {//下一个如果是运算符 则放进运算数组
          operateArr.push(nextNum)
        }
        item = ''   //清空item
        i++         //由于下一位的运算符也被push进去了 所以跳过一位
      }
      console.log(operateArr, 'operateArr')
    }
    result = this.startOperate(operateArr)  //把运算结果渲染到屏幕
    this.setData({
      result:result+'',
      lastSignIndex:-1,
      canDot:true
    })
  },


  startOperate(operateArr) {
    // console.log('开始运算。。。')
    for (let i = 1; i < operateArr.length; i += 2) {//只遍历符号位 运算数在i-1与i+1位置
      let preItem = operateArr[i - 1] * 1   //转换成数字
      let nextItem = operateArr[i + 1] * 1  //转换成数字
      switch (operateArr[i]) {
        case '+':
          operateArr[i + 1] = operateUtils.add(preItem , nextItem)
          break
        case '-':
          operateArr[i + 1] = operateUtils.sub(preItem , nextItem)
          break
        case '*':
          operateArr[i + 1] = operateUtils.mul(preItem , nextItem)
          break
        case '/':
          if (nextItem == 0) {
            this.devByZeroError()   //除数不能为0
            return ''
          }
          operateArr[i + 1] = operateUtils.div(preItem , nextItem)
          break
        case '%':
          if (nextItem == 0) {
            this.devByZeroError()
            return ''
          }
          operateArr[i + 1] = operateUtils.mod(preItem , nextItem)
          break
      }
      console.log('operateArr..', operateArr)
    }
    return operateArr[operateArr.length - 1] //计算结果在了最后一个位置
  },
})