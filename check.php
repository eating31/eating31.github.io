<!DOCTYPE html>
<html>
<head>
  <title>check</title>
  <link rel="stylesheet" href="mystyle.css">
  <meta charset="utf-8">
</head>
<body>

<h3>請再次確認資訊有無錯誤</h3>

<div>
  <div>
    姓名<input type="text" name="name" id="name" placeholder="Your Name" readonly=readonly value=<?php echo $_POST['name'];?>>
   </div>
  <div>
    Email<input type="email"name="email" id="email" placeholder="Your Email" readonly=readonly value=<?php echo $_POST['email'];?>>
   </div>
<div>
  <input type="text" name="subject" id="subject" placeholder="Subject" readonly=readonly value=<?php echo $_POST['subject'];?>>
  </div>
  <div>
    <textarea name="message" rows="5" placeholder="Message" readonly=readonly><?php echo $_POST['message'];?></textarea>
  </div>
</div>

<a href="index.html" onclick="b()">回前頁</a>

<form action="index.html">
<input type="submit" onclick="a()">
</form>

<script>
  function a(){
    alert("Your message has been sent. Thank you!");
  }

  function b(){
    alert("Please re-enter!");
  }  
</script>
</body>
</html>

  