import axios from 'axios'

export default function ajax(url = '', params = {},type = 'GET') {
  let promise;
  //异步方法用promise处理，返回promise
  return new Promise((resolve, reject)=>{
    if('GET' === type){
      //拼接字符串
      let paramsStr = '';
      Object.keys(params).forEach((key)=>{
        paramsStr += key + '=' + params[key] + '&';
      });
      //过滤最后的&
      if(paramsStr !== ''){
        paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'));
      }
      //拼接完整路径
      url += '?' + paramsStr;
      //发起get请求
      promise = axios.get(url);
    }else if('POST' === type){
      promise = axios.post(url,params);
    }
    //返回结果
    promise.then((response)=>{
      resolve(response.data);
    }).catch(err=>{
      reject(err);
    })
  })
}
