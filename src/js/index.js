/**
 * Created by txl-pc on 2017/7/6.
 */
import _ from 'lodash';
import '../css/style.css'
import './bar'

var myImage = new Image();
myImage.src = "./../img/luoti.jpg";    //背景图片  你自己本地的图片或者在线图片
myImage.crossOrigin = 'Anonymous'

myImage.onload = function(img){
    console.log(img)
}



//   function component() {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }
// document.body.appendChild(component());