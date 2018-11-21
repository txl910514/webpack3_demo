/**
 * Created by txl-pc on 2017/7/6.
 */
import _ from 'lodash';
import '../css/style.css'
import './bar'
import Axios from 'axios';
Axios.defaults.withCredentials = true

var myImage = new Image();
myImage.src = "./../img/luoti.jpg";    //背景图片  你自己本地的图片或者在线图片
myImage.crossOrigin = 'Anonymous'

myImage.onload = function (img) {
    console.log(img)
}

var data = function () {
    return new Promise(function (resolve, reject) {
        // Axios.get('http://47.52.128.170/facile/city/getCity').then(function (data) {
        //     resolve(data)
        // })
        // Axios.get('http://127.0.0.1:7001/facile/city/getCity').then(function (data) {
        //     console.log(data);
        //     resolve(data);
        // })
        Axios.get('http://127.0.0.1:7001/facile/validateCode/getImageCode?type=2').then(function (data) {
            console.log(data.data);
            $('#imgageCode').html(data.data.data);
            resolve(data);
        })
    })
}

data()
console.log($);
$(function () {
    $('#imgageCode').on('click', function () {
        Axios.get('http://127.0.0.1:7001/facile/validateCode/getImageCode?type=2').then(function (data) {
            $('#imgageCode').html(data.data.data);
        })
    })
    $('#reg').on('click', function () {
        var params = {
            name: $('#name').val(),
            phone:  $('#phone').val(),
            password:  $('#password').val(),
            confirmPassword: $('#confirmPassword').val(),
            code: $('#code').val()
        }
        Axios.post('http://127.0.0.1:7001/facile/user/createUser', params).then(function (data) {
           console.log(data.data.msg);
        })
    })
})



//   function component() {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }
// document.body.appendChild(component());