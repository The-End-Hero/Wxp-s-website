<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname="user";

$uname=$_POST['name'];
$upwd=$_POST['pwd'];
//echo $uname;
//echo $upwd;
// 创建连接
$conn =mysql_connect($servername, $username, $password);

// 检测连接
if (!$conn)
  {
  die('数据库连接失败: ' . mysql_error());
  }
//echo "Connected successfully";
$my_db=mysql_select_db($dbname,$conn);
// 从表中提取信息的sql语句
$strsql="insert into user(name,pwd) values ('$uname','$upwd')";
// 执行sql查询
$result=mysql_query($strsql, $conn);
//// 获取查询结果
//    $row=mysql_fetch_row($result);
//$users=array();
//$i=0;
//    while($row=mysql_fetch_array($result)){
////     echo $row['id'].'-----------'.$row['name'].'</br>';
//            $users[$i]=$row;
//            $i++;
//    }
//    echo json_encode($users);
mysql_close($conn);
echo "注册成功"
?>