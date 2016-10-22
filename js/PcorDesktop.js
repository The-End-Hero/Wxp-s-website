//判断pc/移动端
var mobile=false;
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    mobile=true;
    window.location.href='mobile.html';
}