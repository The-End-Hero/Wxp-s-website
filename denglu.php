<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname="user";

// 创建连接
$conn =mysql_connect($servername, $username, $password);

// 检测连接
if (!$conn)
  {
  die('数据库连接失败: ' . mysql_error());
  }
//echo "Connected successfully";
$my_db=mysql_select_db($dbname,$conn);
$username = $_POST['name'];
$userpwd = $_POST['pwd'];
// 从表中提取信息的sql语句
    $strsql="SELECT id FROM user WHERE name ='$username' and pwd='$userpwd'";
    // 执行sql查询
    $result=mysql_query($strsql, $conn);
//判断是否能拿到,拿不到返回false
$row=mysql_fetch_array($result);
//echo $row;
if(json_encode($row)=="false"){
    echo "用户名或密码不正确";
}else{
    echo "登陆成功,欢迎您,$username";
}
//链接断开
mysql_close($conn);
?>