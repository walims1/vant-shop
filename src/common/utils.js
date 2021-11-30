  export function debounce(func,delay){
    let timer = null
    return function(...args){
      if(timer) clearTimeout(timer) 
      timer = setTimeout(() => {
        func.apply(this,args)
      },delay)
    }
  }
  //y+ m+ d+等都是正则表达式规则，用于匹配多个字母（不知道别人会传入几个）
  export function formatDate(date, fmt) {
    /*1.获取年份（不确定传几个y）
      y-1 yy-21 yyy-021 yyyy-2021    
    */
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    //2.获取月 日 时 分 秒
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),  //h表示12小时 H表示24小时
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }
  //3.这是一个不足位数自动补齐0的算法
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };