const getBaseNum = (num1,num2)=>{
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return baseNum
}

const add = (num1, num2) =>{
  let baseNum = getBaseNum(num1,num2)
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
const sub = (num1, num2) =>{
  let baseNum = getBaseNum(num1,num2)
  return (num1 * baseNum - num2 * baseNum) / baseNum;
}
const mul= (num1, num2) =>{
  let baseNum = getBaseNum(num1,num2)
  return (num1 * baseNum * num2 * baseNum) / baseNum / baseNum;
}
const div = (num1, num2) =>{
  let baseNum = getBaseNum(num1,num2)
  return ((num1 * baseNum) / (num2 * baseNum)) ;
}
const mod = (num1, num2) =>{
  let baseNum = getBaseNum(num1,num2)
  return ((num1 * baseNum) % (num2 * baseNum));
}


module.exports = {
  add:add,
  sub:sub,
  mul:mul,
  div:div,
  mod:mod
}
