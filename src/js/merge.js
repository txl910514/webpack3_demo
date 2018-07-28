import '../css/style.css'
var luotiImage = new Image();
var luoti = require('./../img/luoti.jpg')
luotiImage.src = luoti;    //背景图片  你自己本地的图片或者在线图片
luotiImage.crossOrigin = 'Anonymous'

luotiImage.onload = function(){
    var luoti1Image = new Image();
    var luoti1 = require('./../img/luoti1.jpg')
    luoti1Image.src = luoti1;    //背景图片  你自己本地的图片或者在线图片
    luoti1Image.crossOrigin = 'Anonymous'
    luoti1Image.onload = function(img){
        // var width = luotiImage.width > luoti1Image.width ? luotiImage.width : luoti1Image.width
        var width = 1366
        var imgHeight = luotiImage.height * width / luotiImage.width
        var img1Height = luoti1Image.height * width / luoti1Image.width
        var height = imgHeight + img1Height
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        context.rect(0 , 0 , canvas.width , canvas.height);
        context.fillStyle = "#fff";
        context.fill();
        context.drawImage(luotiImage , 0 , 0 , width , imgHeight);
        context.drawImage(luoti1Image , 0 , imgHeight , width , img1Height);
        context.save();
        context.translate(0, 0)
        context.rotate(26 * Math.PI / 180);
        context.font = "italic 70px 黑体";
        // context.fillStyle = "gray";
        context.fillStyle = "red";
        context.fillText("裸体美女性奴",width / 2, imgHeight / 4);
        context.restore();
        context.save();
        context.translate(0, 0)
        context.rotate(-26 * Math.PI / 180);
        context.font = "italic 70px 黑体";
        context.fillStyle = "red";
        context.fillText("裸体美女性奴",width *3 / 28 , height - img1Height / 4);
        context.restore();
        context.save();
        context.translate(0, 0)
        context.rotate(-26 * Math.PI / 180);
        context.font = "italic 70px 黑体";
        context.fillStyle = "red";
        context.fillText("裸体美女性奴",-width / 3 , height- img1Height / 2);
        context.restore();
        var base64 = canvas.toDataURL("image/png");  //"image/png" 这里注意一下
        var imgDom = document.getElementById('avatar');
        // document.getElementById('avatar').src = base64;
        imgDom.setAttribute('src' , base64);
    }
}