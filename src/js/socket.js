import io from 'socket.io-client';
import Axios from 'axios';
Axios.defaults.withCredentials = true
var userId = 0;
var toUserId = 2;
Axios.interceptors.request.use((config) => {
  config.headers.token = getCookie('token')
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})
$(function () {
  const socket = io('http://127.0.0.1:7001/facile_socket', {
    // 实际使用中可以在这里传递参数
    query: {
      // room: 'demo',
      // userId: `client_${Math.random()}`,
      token: getCookie('token'),
      toUserId: toUserId
    },
    transports: ['websocket']
  })

  socket.on('connect', () => {
    const id = socket.id;
    console.log(id);
    // socket.emit('exchange', 'hello world!');
    // log('#connect,', id, socket);
    // 监听自身 id 以实现 p2p 通讯
    socket.on(id, msg => {
      //   log('#receive,', msg);
    });
  });
  // 接收在线用户信息
  socket.on('online', msg => {
    console.log(msg);
    // log('#online,', msg);
  });
  socket.on('userInfo', msg => {
    console.log(msg);
    userId = msg.data.payload.userId;
    // log('#online,', msg);
  });
  socket.on('reviceMsg', msg => {
    console.log(msg);
    // log('#online,', msg);
  });
  // 系统事件
  socket.on('disconnect', msg => {
    console.log(msg); //服务断开监听
    // log('#disconnect', msg);
  });
  socket.on('disconnecting', () => {
    // log('#disconnecting');
  });
  socket.on('error', () => {
    // log('#error');
  });
  $('#send').on('click', function () {
    const value = $('#value').val();
    $('#value').val('');
    if ($.trim(value)) {
      socket.emit('sendMsg', {
        toUserId: toUserId,
        userId: userId,
        info: value
      });
      $('#value').val('');
    } else {
      alert('请输入文字');
    }
  })
  $('#disconnect').on('click', function () {
    console.log('disconnect')
    socket.disconnect();
  })

  $('#history').on('click', function () {
    
    Axios.get('http://127.0.0.1/facile/info/history', {
      params: {
        userId: userId,
        toUserId: toUserId,
        page:$('#page').val() || 1,
        size:5
      }
    }).then(function (data) {
      console.log(data.data.data);
  })
  })

})

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
   return (arr[2]);
  else
   return null;
}