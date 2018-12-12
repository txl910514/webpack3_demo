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

Axios.interceptors.request.use((config) => {
    config.headers.token = getCookie('token')
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })

var data = function () {
    return new Promise(function (resolve, reject) {
        // Axios.get('http://47.52.128.170/facile/city/getCity').then(function (data) {
        //     resolve(data)
        // })
        // Axios.get('http://127.0.0.1/facile/city/getCity').then(function (data) {
        //     console.log(data);
        //     resolve(data);
        // })
        // Axios.get('http://127.0.0.1/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     console.log(data.data);
        //     $('#imgageCode').html(data.data.data);
        //     resolve(data);
        // })
        Axios.get('http://127.0.0.1/facile/validateCode/getImageCode?type=3').then(function (data) {
            $('#forget_imgageCode').html(data.data.data);
        })
        Axios.get('http://127.0.0.1/facile/validateCode/getImageCode?type=1').then(function (data) {
            $('#login_imgageCode').html(data.data.data);
        })
        Axios.get('/facile/validateCode/getImageCode?type=2').then(function (data) {
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
        // Axios.get('http://127.0.0.1/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
        Axios.get('/facile/validateCode/getImageCode?type=2').then(function (data) {
            $('#imgageCode').html(data.data.data);
        })
    })
    $('#forget_imgageCode').on('click', function () {
        Axios.get('http://127.0.0.1/facile/validateCode/getImageCode?type=3').then(function (data) {
            $('#forget_imgageCode').html(data.data.data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
    $('#login_imgageCode').on('click', function () {
        Axios.get('/facile/validateCode/getImageCode?type=1').then(function (data) {
            $('#login_imgageCode').html(data.data.data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
    $('#get_sms_code').on('click', function () {
        var phone = $('#phone').val();
        // Axios.get('http://127.0.0.1/facile/validateCode/getSmsCode?type=2&phone=' + phone).then(function (data) {
        //     console.log(data);
        // })
        Axios.get('/facile/validateCode/getSmsCode?type=2&phone=' + phone).then(function (data) {
            console.log(data);
        })
    })

    $('#reg').on('click', function () {
        var params = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            password: $('#password').val(),
            confirmPassword: $('#confirmPassword').val(),
            code: $('#code').val(),
            sms_code: $('#sms_code').val()
        }
        // Axios.post('http://127.0.0.1/facile/user/register/createUser', params).then(function (data) {
        //     console.log(data.data.msg);
        // })
        Axios.post('/facile/user/register/createUser', params).then(function (data) {
            console.log(data.data.msg);
        })
    })
    $('#forget_get_sms_code').on('click', function () {
        var phone = $('#forget_phone').val();
        Axios.get('http://127.0.0.1/facile/validateCode/getSmsCode?type=3&phone=' + phone).then(function (data) {
            console.log(data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
    $('#forget_reg').on('click', function () {
        var params = {
            phone: $('#forget_phone').val(),
            password: $('#forget_password').val(),
            confirmPassword: $('#forget_confirmPassword').val(),
            code: $('#forget_code').val(),
            sms_code: $('#forget_sms_code').val()
        }
        Axios.post('http://127.0.0.1/facile/user/forgetPassword', params).then(function (data) {
            console.log(data.data.msg);
        })
        // Axios.post('http://47.52.128.170/facile/register/createUser', params).then(function (data) {
        //     console.log(data.data.msg);
        // })
    })
    $('#login').on('click', function () {
        var params = {
            name: $('#login_name').val(),
            password: $('#login_password').val(),
            code: $('#login_code').val()
        }
        Axios.post('/facile/user/login', params).then(function (data) {
            console.log(data.data.msg);
        })
        // Axios.post('http://47.52.128.170/facile/register/createUser', params).then(function (data) {
        //     console.log(data.data.msg);
        // })
    })
    $('#login_get_sms_code').on('click', function () {
        var phone = $('#login_phone').val();
        Axios.get('http://127.0.0.1/facile/validateCode/getSmsCode?type=1&phone=' + phone).then(function (data) {
            console.log(data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
    $('#sms_login').on('click', function () {
        var params = {
            phone: $('#login_phone').val(),
            code: $('#png_login_code').val(),
            sms_code: $('#login_sms_code').val() 
        }
        Axios.post('http://127.0.0.1/facile/user/smsLogin', params).then(function (data) {
            console.log(data.data.msg);
        })
    })
    $('#getCity').on('click', function () {
        console.log(getCookie('token'))
        Axios.get('http://127.0.0.1/facile/city/getCity').then(function (data) {
            console.log(data.data);
        })
        // Axios.post('http://47.52.128.170/facile/register/createUser', params).then(function (data) {
        //     console.log(data.data.msg);
        // })
    })
    $('#loginOut').on('click', function () {
        console.log(getCookie('token'))
        Axios.get('http://127.0.0.1/facile/user/loginOut').then(function (data) {
            console.log(data.data);
        })
        // Axios.post('http://47.52.128.170/facile/register/createUser', params).then(function (data) {
        //     console.log(data.data.msg);
        // })
    })
    $('#userName_save').on('click', function () {
        var params = {
            name: $('#editUserName').val()
        }
        Axios.post('http://127.0.0.1/facile/user/setting/editUserName', params).then(function (data) {
            console.log(data.data.msg);
        })
    })
    $('#edit_phone_click').on('click', function () {
        var params = {
            original_code: $('#editPhone_original_sms_code').val(),
            phone: $('#edit_phone').val(),
            code: $('#editPhone_new_sms_code').val()
        }
        Axios.post('http://127.0.0.1/facile/user/setting/editPhone', params).then(function (data) {
            console.log(data.data.msg);
        })
    })
    $('#login_original_sms_code').on('click', function () {
        // var phone = $('#login_phone').val();
        Axios.get('http://127.0.0.1/facile/validateCode/getSmsCode?type=4').then(function (data) {
            console.log(data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
    $('#login_new_sms_code').on('click', function () {
        var phone = $('#edit_phone').val();
        Axios.get('http://127.0.0.1/facile/validateCode/getSmsCode?type=5&phone=' + phone).then(function (data) {
            console.log(data);
        })
        // Axios.get('http://47.52.128.170/facile/validateCode/getImageCode?type=2').then(function (data) {
        //     $('#imgageCode').html(data.data.data);
        // })
    })
})



function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
     return (arr[2]);
    else
     return null;
}
//   function component() {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }
// document.body.appendChild(component());