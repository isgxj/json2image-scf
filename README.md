# json2image-scf  

jsonimage在node后端使用，示例为[腾讯云函数](https://cloud.tencent.com/document/product/583)

## 安装  

```
npm i -S json2image canvas
or
yarn add -S json2image canvas
```

## 注意
1、canvas需要在安装时编译二进制代码，不同操作系统有区别，如果部署失败，需要关闭自动安装依赖，在腾讯云函数控制台，手动重新运行 cnpm i 安装依赖  
2、腾讯云函数服务器需要使用canvas@2.6.1版本  


## 调用示例
<a href="https://sls-layer-ap-guangzhou-code-1251208590.cos-website.ap-guangzhou.myqcloud.com/json2image/" target="_blank">demo</a>  


## 前端使用
get请求对url长度有限制，ie9及以上，chrome对url的限制都是8000左右。  
如果对json编码后超过8000，需要使用post请求，获取base64设置给img标签

```js

var imgEl = document.getElementById('imgEl');
var scfUrl = 'https://scf-test.com/release/json2image';
const data = {/*...数据格式和前端使用相同*/};
var src = scfurl + '?data=' + encodeURIComponent(JSON.stringify(data));
imgEl.src = src;

```

## 后台部署  

```js

const json2image = require('./json2image');
const { createCanvas, Image, registerFont } = require('canvas');

// 导入字体
registerFont('./font/PingFang.ttf', { family: 'PingFang SC' });

// 覆盖两个前端对象
global.document = {
  createElement: createCanvas,
};
global.Image = Image;

// 接收到前端data，转换为js对象
const data = {/*...数据格式和前端使用相同*/};
json2image(data, url => console.log(url), url => console.log(url));

```
