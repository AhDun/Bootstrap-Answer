<?php
$ip = $_SERVER['REMOTE_ADDR'];
$datetime = date('Y-m-d H:i:s');
$ua = $_SERVER['HTTP_USER_AGENT'];
$fp = fopen("../ip.txt","a+");
fwrite($fp,'['.$datetime.']' . $ip . ' '. $ua."\n");
fclose($fp);
?>

<!DOCTYPE html>
<html>
<head>
  <title>测试题库练习平台</title>
  <meta charset="UTF-8" name="viewport" content="width=device-width,initial-scale=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="pragma" content="no-store"  />
  <meta http-equiv="content-type" content="no-store, must-revalidate" />
  <meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT"/>
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">
  <meta http-equiv="Cache" content="no-cache">
  <link href="../Bootstrap/dist/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/index.css">
  <script src="../Bootstrap/dist/js/bootstrap.js"></script>
  <script src="js/QuestionBankParse.js"></script>
  <script src="js/index.js" type="text/javascript"></script>
</head>
<body>

  <nav class="bg-info text-white" style="height: auto;box-shadow: 1px 1px 3px rgba(0,0,0,0.5);z-index: 1;position:fixed;top: 0px;width: 100%">
    <h4 style="text-align: center;padding:5px;margin: 0px;">
      练习平台
      <div style="font-size: 15px"></div>
    </h4>
  </nav>
  <nav class="bg-info text-white" style="height: auto;">
    <h4 style="text-align: center;padding:5px;margin: 0px;">
      练习平台
      <div style="font-size: 15px"></div>
    </h4>
  </nav>

  <div>
  <div id="startPage">
    <div style="text-align: center;margin-top: 100px" id="loading">
      <div class="spinner-border text-secondary"></div>
      <div>正在加载题库...</div>
    </div>
    <div id="startPageButton" style="display: none;">
      <div class="startPageNum">
        <div style="font-size: 25px;background-color:blue;color: #ffffff" onclick="start(104)">答题卡</div>
        <div style="font-size: 25px;margin-top: 10px">测试题库</div>
        <div style="font-size: 15px;margin-top: 5px">*已支持苹果手机</div>
        <div style="font-size: 15px;margin-top: 5px">*新增题目反馈</div>
        <div>单选题<div id="optionNum"  class="divnum"> </div> 道</div>
        <div>多选题<div id="checkboxNum" class="divnum"> </div> 道</div>
        <div>判断题<div id="judgeNum" class="divnum" > </div> 道</div>

        <div>共<div id="QuestionSum" class="divnum" style="color: red"> </div> 道题</div>
        <div class="d-grid gap-2" style="margin: 10px;">
          <button class="btn btn-danger" type="button" style="margin-top: 10px;" onclick="start(100)">随机作答所有的题</button>
          <button class="btn btn-warning" type="button" style="margin-top: 10px;" onclick="start(50)">随机作答50%的题</button>
          <button class="btn btn-secondary" type="button" style="margin-top: 10px;" onclick="start(25)">随机作答25%的题</button>
          <button class="btn btn-info" type="button" style="margin-top: 10px;" onclick="start(101)">随机作答单选题</button>
          <button class="btn btn-primary" type="button" style="margin-top: 10px;" onclick="start(102)">随机作答多选题</button>
          <button class="btn btn-dark" type="button" style="margin-top: 10px;" onclick="start(103)">随机作答判断题</button>
        </div>
      </div>

    </div>
    <!--<button type="button" class="btn btn-outline-primary optionButton"  onclick="check('+"'" + optionID[i] +"'" + ')"><img src="img/Picture1.jpg"></button>;-->
  </div>

  <div id="QuestionPage" style="display: none;">
    <div class="progress" style="height: 30px;border-radius:0px;">
      <div class="progress-bar progress-bar-striped progress-bar-animated" style="font-size: 20px;color:black;" id="count"><div style="position:absolute;margin: 0px 10px;" id="counts"></div></div>
    </div>
    <div id="Question" style="font-size: 25px;margin: 20px;">题目</div>
    <div id="option" style="font-size: 15px;margin: 20px;">选项</div>
    <div class="d-grid gap-2" style="margin: 50px 20px" id="buttonOK">
      <button class="btn btn-success nextButton" type="button" onclick="next()">下一题</button>
    </div>
    <div id="message"></div>
    <div style="display: none;" id="feedbackButton">
      <div style="color: red;text-align: center;margin: 20px 0px;" onclick="feedback('start')" id=""><div>这个题不对,点击这里反馈！！</div></div>
    </div>
    <div style="display: none;" id="feedbackButtonGroup">
      <div class="feedbackCard">
        <div style="font-size: 25px;background-color:#5c636a;color: #ffffff">反馈卡</div>
        <div style="font-size: 15px;margin: 0px 20px;">
          <button type="button" class="btn btn-outline-primary optionButton" onclick="feedbackChock('feedback1')" id="feedback1" value="0">题目不正确</button>
          <button type="button" class="btn btn-outline-primary optionButton" onclick="feedbackChock('feedback2')" id="feedback2" value="0">选项不正确</button>
          <button type="button" class="btn btn-outline-primary optionButton" onclick="feedbackChock('feedback3')" id="feedback3" value="0">答案不正确</button>
          <button type="button" class="btn btn-outline-primary optionButton" onclick="feedbackChock('feedback4')" id="feedback4" value="0">其他</button>
          <button type="button" class="btn btn-danger optionButton" onclick="feedback('ok')" id="feedback4" value="0">反馈</button>
        </div>
      </div>
    </div>


  </div>

  <div id="endPage" style="display: none;">
    <div>
      <div class="startPageNum">
        <div style="color: #fff;font-size: 25px;background-color: #ffd500">成绩卡</div>
        <div style="font-size: 20px;margin-top: 10px">测试题库</div>
        <div style="text-align: center;font-size: 35px;">用了 <div id="endTime"></div></div>
        <div style="text-align: center;font-size: 35px;">答了<div id="endSum" style="display: inline-block"></div> 个题</div>
        <div style="text-align: center;font-size: 40px;">得了<div id="endGrade" style="display: inline-block"></div> 分</div>
        <div style="margin: 20px 50px;text-align: center;"id="endButton"></div>
      </div>
      <div id="errorCard" style="display: none">
        <div class="errorCards"><div style="color: #fff;font-size: 25px;background-color: red">错题卡</div><div id="errorQuestion"></div></div>
      </div>
      <div id="QuestionCard" style="display: none">
        <div class="QuestionCards"><div style="color: #fff;font-size: 25px;background-color: blue">答题卡</div><div id="OKQuestion"></div></div>
      </div>
    </div>
  </div>

</div>

</body>
</html>
