//document.write('<script src="'+"js/QuestionBankParse.js"+'"></script>');

let Grade = 100;
let count = 0;
let countMax = 0;
let option = [];
let result = [];
let Question = [];
let QuestionDup = [];
let ErrorQuestion = [];
let ErrorResult = [];
let ErrorCount = 0;
let ContErrorCount = 0;
let ErrorLastCount = 100000;
let MessageTimer = 0;
let timer = 0;
let optionNum = 0;
let optionArr = []
let checkboxNum = 0;
let checkboxArr = [];
let judgeNum = 0;
let judgeArr = [];
let QuestionTimers;
let optionID;

function feedback(result){
    if(result == 'start'){
        document.getElementById("feedbackButtonGroup").style.display='inline';
    }else{
        let fstr = '';
        for(let i = 1; i <= 4;i ++){
            if(document.getElementById("feedback"+ i).value > 0){
                if(fstr.length > 0){
                    fstr += ',';
                }
                fstr += document.getElementById("feedback"+ i).innerHTML;
            }
        }
        const Http = new XMLHttpRequest();
        Http.open("GET", 'feedback.php?'+'Question='+Question[count]+' &feedback='+fstr);
        Http.send();
        window.alert("谢谢你的反馈，该问题已提交到后台，开发者会已最快速度更新题库 ")
        document.getElementById('feedbackButton').style.display = 'none';
        document.getElementById('feedbackButtonGroup').style.display = 'none';


    }

}

function feedbackChock(result){
    let input_doc = document.getElementById(result);
    if(input_doc.value == 0){
        input_doc.style.backgroundColor="#0d6efd";
        input_doc.style.color="#fff";
        input_doc.value = 1;
    }else{
        input_doc.style.backgroundColor="#fff";
        input_doc.style.color="#0d6efd";
        input_doc.value = 0;
    }
}
function strCut(str,start,end)
{
    const strs = String(str)
    if(end > 0){
        return strs.slice(start,strs.length - (end));
    }else{
        return strs.slice(start);
    }

}
function timerInit(){
    QuestionTimers = setInterval(function (){
        timer += 1;
        const sec = Math.trunc(timer / 10) % 60;
        const min = Math.trunc(timer / 10 / 60) ;

        let counts_doc = document.getElementById("counts");
        const n = count + 1;
        counts_doc.innerHTML = '第'+n+'题，共'+countMax+'题'+'（'+Math.trunc(min / 10) +''+min  % 10 +':'+Math.trunc(sec / 10) +''+sec%10+'）';

    },100);
}
function correct(result){
    let message_doc = document.getElementById("message");
    message_doc.innerHTML = '<div class="alert alert-success" style="margin: 20px;"><strong>恭喜你，答对了!</strong> </div>';
    document.getElementById("buttonOK").innerHTML= '<button class="btn btn-success nextButton" type="button" onclick="next()">下一题</button>';;
    clearTimeout(MessageTimer);
    const option_select = ['A','B','C','D','E','F'];
    for(let i = 0; i < option.length;i++) {
        document.getElementById('option_'+option_select[i]).classList = 'btn btn-outline-primary optionButton disabled';
    }

}
function error(result){
    let message_doc = document.getElementById("message");
    if(++ContErrorCount >= 4){
        message_doc.innerHTML = '<div class="alert alert-danger error" style="margin: 20px;"><strong>抱歉，答错了!</strong><br>参考答案：'+ strCut(String(Question[count].match(/答案：.*/)),3,0).match(/[A-F]/g) +'</div>';
    }else {
        message_doc.innerHTML = '<div class="alert alert-danger error" style="margin: 20px;"><strong>抱歉，答错了!</strong> </div>';
    }
    if(navigator.vibrate) {
        window.navigator.vibrate([200, 100, 200]);
    }
    clearTimeout(MessageTimer);
    MessageTimer = setTimeout(function (){
        document.getElementById("message").innerHTML = '';
    },2000);
    if(ErrorLastCount != count){
        if(ErrorLastCount != 100000){
            ErrorCount++;
        }
        ErrorLastCount = count;
    }

    const optionIDS = ['A','B','C','D','E','F'];
    if(result.length > 1){
        let results = '';
        for(let i = 0 ,j = 0; i < optionID.length;i++){
            for(let j = 0; j < result.length;j++){
                if(result[j] == optionID[i]){
                    if(results.length > 0){
                        results += ','
                    }
                    results +=  String(optionIDS[i]);
                }
            }

        }

        result = results;
    }else{
        for(let i = 0; i < optionID.length;i++){
            if(result[0] == optionID[i]){
                result = optionIDS[i];
                break;
            }
        }
    }

    ErrorQuestion[ErrorCount] = Question[count];
    ErrorResult[ErrorCount] = result;




}
function check(value){
    const option_select = ['A','B','C','D','E','F'];
    let erroroption = '';
    let activeCount = 0;
    for(let i = 0; i < option.length;i++) {
        if(document.getElementById('option_'+option_select[i]).value == 1) {
            if(erroroption.length > 0){
                erroroption += ',';
            }
            erroroption +=  option_select[i];
        }
    }
    for(let i = 0; i < option.length;i++) {
        if(document.getElementById('option_'+option_select[i]).value == 1){
            if(result.indexOf(option_select[i]) >= 0){
                activeCount++;
            }else{
                if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])){
                    if(value == 'A'){
                        return  error('对');
                    }else{
                        return  error('错');
                    }
                }else{
                    return error(erroroption);
                }
            }
        }
    }
    if(activeCount == result.length){
        return correct();
    }else{
        return error(erroroption);
    }

}
function buttonActive(ID){
    if(result.length <= 1) {
        const option_select = ['A','B','C','D','E','F'];
        let input_doc = document.getElementById(ID);
        if(input_doc.value == 0){
            for(let i = 0; i < option.length;i++) {
                document.getElementById('option_'+option_select[i]).value = 0;
                document.getElementById('option_'+option_select[i]).style.backgroundColor = "#fff";
                document.getElementById('option_'+option_select[i]).style.color = "#0d6efd";
            }
            let input_doc = document.getElementById(ID);
            input_doc.style.backgroundColor="#0d6efd";
            input_doc.style.color="#fff";
            input_doc.value = 1;
        }else{
            input_doc.style.backgroundColor="#fff";
            input_doc.style.color="#0d6efd";
            input_doc.value = 0;
        }


    }else{
        let input_doc = document.getElementById(ID);
        if(input_doc.value == 0){
            input_doc.style.backgroundColor="#0d6efd";
            input_doc.style.color="#fff";
            input_doc.value = 1;
        }else{
            input_doc.style.backgroundColor="#fff";
            input_doc.style.color="#0d6efd";
            input_doc.value = 0;
        }
    }
    const option_select = ['A','B','C','D','E','F'];
    for(let i = 0; i < option.length;i++) {
        if(document.getElementById('option_'+option_select[i]).value == 1){
            if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])) {
                document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning "  type="button" onclick="check()">判断题,选好了</button>';
            }else{
                if(result.length <= 1) {
                    document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning "  type="button" onclick="check()">单选题,选好了</button>';
                }else{
                    document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning " type="button" onclick="check()">多选题,选好了</button>';
                }
            }
            return ;
        }
    }
    if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])) {
        document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled"  type="button" onclick="check()">判断题,选好了</button>';
    }else{
        if(result.length <= 1) {
            document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled"  type="button" onclick="check()">单选题,选好了</button>';
        }else{
            document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled" type="button" onclick="check()">多选题,选好了</button>';
        }
    }
}
function load(){
    window.scrollTo(0, 0);
    document.getElementById("count").style.width = ( 100/ countMax * (count + 1)) + '%';
    let Question_doc = document.getElementById("Question");
    let Questions = strCut(String(Question[count].match(/题目：.*选项/)),3,2);
    result = String(strCut(Question[count].match(/答案：.*/),3,0)).match(/[A-F]/g);
    if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])) {
        Questions = '(判断题) ' + Questions;
    }else{
        if(result.length <= 1) {
            Questions = '(单选题) ' + Questions;
        }else{
            Questions = '(多选题) ' + Questions;
        }
    }


    if(/\[.*\]/.test(Questions)){

        let html = '<img id="QuestionsImg" src="'  +strCut(Questions.match(/\[.*\]/),1,1)+'.png'+ '">';
        Questions = Questions.replace(/\[.*\]/,'');
        Question_doc.innerHTML =  Questions + '<br>' + html;
    }else{
        Question_doc.innerHTML=Questions;
    }
    option = matchOption(strCut(String(Question[count].match(/选项：.*答案：/)),3,3));
    let options = [];


    optionID = ['A','B','C','D','E','F'];
    for(let i = 0,j = 0 ;i < option.length;i++){
        if(result[j] == optionID[i]){
            options[i] = '.'+ option[i];
            j++;
        }else{
            options[i] =  option[i];
        }
    }

    if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])) {

    }else{
        options.sort(function () {
            return (0.5 - Math.random());
        });

    }

    let sortResult = '';

    for(let i = 0,j = 0 ;i < options.length;i++){
        if(options[i][0] == '.'){
            options[i] = options[i].slice(1);
            sortResult += optionID[i];
        }
    }


    console.log(Question[count]);
    Question[count] = String(Question[count]).replace(/答案：.*/,'答案：'+sortResult);
    let sortOption = '';
    for(let i = 0; i < options.length;i++){
        sortOption += optionID[i] +'.'+ options[i]+' ';
    }
    Question[count] = String(Question[count]).replace(/选项：.*答案：/,'选项：'+sortOption+'答案：');
    console.log(Question[count]);

    option = matchOption(strCut(String(Question[count].match(/选项：.*答案：/)),3,3));
    result = String(strCut(Question[count].match(/答案：.*/),3,0)).match(/[A-F]/g);


    let option_html = '';

    for(let i = 0; i < option.length;i++){
        if(/\[.*\]/.test(options[i])){
            const isrc = strCut(options[i].match(/\[.*\]/),1,1) +'.png';
            options[i] = options[i].replace(/\[.*\]/,'');
            option_html += '<button type="button" class="btn btn-outline-primary optionButton"   value="0" onclick="buttonActive(id)" id="option_'+ optionID[i] +'">' +optionID[i] +'.'+ options[i] + '<br><image id="QuestionsImg" src = "' + isrc + '"></button>';
        }else{
            option_html += '<button type="button" class="btn btn-outline-primary optionButton"   value="0" onclick="buttonActive(id)" id="option_'+ optionID[i] +'">' +optionID[i] +'.'+ options[i] + '</button>';
        }
    }
    if(/选项：[\s]*A.对[\s]*B.错/.test(Question[count])) {
        document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled" type="button" onclick="check()">判断题,选好了</button>';
    }else{
        if(result.length <= 1) {
            document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled" type="button" onclick="check()">单选题,选好了</button>';
        }else{
            document.getElementById("buttonOK").innerHTML= '<button class="btn btn-warning disabled" type="button" onclick="check()">多选题,选好了</button>';
        }
    }


    let option_doc = document.getElementById("option");
    option_doc.innerHTML = option_html;

    let message_doc = document.getElementById("message");
    message_doc.innerHTML = "";

    document.getElementById('feedbackButton').style.display = 'inline';
    document.getElementById('feedbackButtonGroup').style.display = 'none';
}
function starterror(mode){
    Grade = 100;
    count = 0;
    countMax = 0;
    option = [];
    result = [];
    ErrorQuestion = [];
    ErrorResult = [];
    ErrorCount = 0;
    ContErrorCount = 0;
    ErrorLastCount = 100000;
    MessageTimer = 0;
    timer = 0;
    optionNum = 0;
    optionArr = []
    checkboxNum = 0;
    checkboxArr = [];
    judgeNum = 0;
    judgeArr = [];

    if(mode == 1){
        Question = QuestionDup;
    }
    Question.sort(function () {
        return (0.5 - Math.random());
    });
    countMax = Question.length;
    document.getElementById("QuestionPage").style.display="inline";
    document.getElementById("endPage").style.display="none";
    timerInit();
    load();
}
function start(num){
    if(num <= 100) {
        Question.sort(function () {
            return (0.5 - Math.random());
        });
        countMax = Math.trunc((Question.length / 100) *  num);
        const Questions = Question;
        Question = [];
        for(let i = 0;i < countMax;i++){
            Question[i] = Questions[i];
        }
    }else{
        switch (num){
            case 101:Question = optionArr;break;
            case 102:Question = checkboxArr;break;
            case 103:Question = judgeArr;break;
            case 104:
                Question.sort(function () {
                    return (0.5 - Math.random());
                });
                countMax = 3;
                const Questions = Question;
                Question = [];
                for(let i = 0;i < countMax;i++){
                    Question[i] = Questions[i];
                }
                break;
        }
        Question.sort(function () {
            return (0.5 - Math.random());
        });
        countMax = Question.length;
    }


    document.getElementById("startPage").style.display="none";
    document.getElementById("QuestionPage").style.display="inline";
    timer = 0;
    load();
}
function end(){
    document.getElementById("QuestionPage").style.display="none";
    document.getElementById("endPage").style.display="inline";
    QuestionDup = Question;
    window.scrollTo(0, 0);
    let endTime_doc = document.getElementById("endTime");
    let endSum_doc = document.getElementById("endSum");
    let endGrade_doc = document.getElementById("endGrade");
    let a = 0,b =  0,c = 0;
    Grade -= ((100 / countMax) *ErrorQuestion.length);

    const Http = new XMLHttpRequest();
    const sec1 = Math.trunc(timer / 10) % 60;
    const min1 = Math.trunc(timer / 10 / 60) ;
    Http.open("GET", 'grade.php?'+'time='+Math.trunc(min1 / 10) +''+min1  % 10 +'分'+Math.trunc(sec1 / 10) +''+sec1%10+'秒'+'&grade='+Math.trunc(Grade)+'&count='+countMax);
    Http.send();

    let bhtml = '<button class="btn btn-primary" type="button" style="margin: 5px 0px;width: 100%;" onclick="location.reload()">重新抽题</button><br>\n';
    if(ErrorQuestion.length){
        bhtml += '<button class="btn btn-warning" type="button" style="margin: 5px 0px;width: 100%;" onclick="starterror(1)">再做一次</button><br>\n';
        bhtml += '<button class="btn btn-danger" type="button" style="margin: 5px 0px;width: 100%;" onclick="starterror(2)">只做错题</button>';
    }
    document.getElementById("endButton").innerHTML = bhtml;
    let timer1 = setInterval(function (){
        const sec = Math.trunc(a / 10) % 60;
        const min = Math.trunc(a / 10 / 60) ;
        endTime_doc.innerHTML = Math.trunc(min / 10) +''+min  % 10 +'分'+Math.trunc(sec / 10) +''+sec%10+'秒';


        if(b < countMax){
            b++;
        }else{
            endSum_doc.innerHTML = countMax;
        }
        endSum_doc.innerHTML = ''+b;



        if(c < Grade){
            c++;
        }else{
            endGrade_doc.innerHTML = ''+Math.trunc(Grade);
        }
        endGrade_doc.innerHTML= ''+c;

        if(a > timer){
            endSum_doc.innerHTML = ''+countMax;
            endGrade_doc.innerHTML = ''+Math.trunc(Grade);
            const sec = Math.trunc(timer / 10) % 60;
            const min = Math.trunc(timer / 10 / 60) ;
            endTime_doc.innerHTML = Math.trunc(min / 10) +''+min  % 10 +'分'+Math.trunc(sec / 10) +''+sec%10+'秒';
            clearInterval(timer1);
        }
        a += timer / 50;
    },10);
    let  optionName = ['A','B','C','D','E','F'];
    let Card_doc;
    let CardCount = 0;
    document.getElementById("errorCard").style.display = 'none';
    document.getElementById("QuestionCard").style.display = 'none';
    if(ErrorQuestion.length > 0){
        document.getElementById("errorCard").style.display = 'inline';
        Card_doc =  document.getElementById("errorQuestion");
        Question  = ErrorQuestion;
        CardCount = Question.length;
    }else{
        document.getElementById("QuestionCard").style.display = 'inline';
        Card_doc = document.getElementById("OKQuestion");
        CardCount = countMax;
    }
    let iHtml = '';
    for(let i = 0; i < CardCount;i++){
        const Questions = strCut(String(Question[i].match(/题目：.*选项/)),3,2);
        if(/\[.*\]/.test(Questions)){
            let Questions1 = Questions;
            iHtml += '<div id = "errorQuestion" style="font-size:20px ">'+String(Questions).replace(/\[.*\]/,'')+'</div>';
            const isrc = strCut(Questions1.match(/\[.*\]/),1,1) +'.png';
            iHtml += '<img id="QuestionsImg" src = ' +isrc+ '></div>';
        }else{
            iHtml += '<div id = "errorQuestion" style="font-size:20px ">'+Questions+'</div>';
        }
        const optionstr = strCut(Question[i].match(/选项：.*答案：/),3,3);
        if(/\[.*\]/.test(optionstr)){
            iHtml += '<div id = "errorQuestion" >题目选项：'  + '</div>';
            options = matchOption(String(optionstr));
            for(let i = 0; i < options.length;i++) {
                const isrc = strCut(options[i].match(/\[.*\]/),1,1) +'.png';
                options[i] = String(options[i]).replace(/\[.*\]/,'');
                iHtml += '<div id = "errorQuestion" >'+optionName[i]+'.'+options[i]+'<img id="QuestionsImg" src = ' +isrc+ '></div>';

            }
        }else{
            iHtml += '<div id = "errorQuestion" >题目选项：' + '</div>';
            const optionstr = strCut(Question[i].match(/选项：.*答案：/),3,3);
            options = matchOption(String(optionstr));
            for(let i = 0; i < options.length;i++) {
                iHtml += '<div id = "errorQuestion" >'+optionName[i]+'.'+options[i]+'</div>';
            }
        }
        if(ErrorQuestion.length > 0){
            QuestionName = '正确答案：';
        }else{
            QuestionName = '你的答案：';
        }
        if(/选项：[\s]*A.对[\s]*B.错/.test(Question[i])) {
            if(strCut(String(Question[i].match(/答案：.*/)),3,0).match(/[A-F]/g) == 'A'){
                iHtml += '<div id = "errorQuestion" style="color: green">' +QuestionName + '对' + '</div>';
            }else{
                iHtml += '<div id = "errorQuestion" style="color: green">' + QuestionName +  '错' + '</div>';
            }

        }else {
            iHtml += '<div id = "errorQuestion" style="color: green">' + QuestionName + strCut(String(Question[i].match(/答案：.*/)),3,0).match(/[A-F]/g) + '</div>';
        }
        if(ErrorQuestion.length > 0){
            iHtml += '<div id = "errorQuestion" style="color:red ">你的答案：'+ErrorResult[i]+'</div>';
        }
        iHtml += '<hr>';
    }
    Card_doc.innerHTML = iHtml;
}
function  next(){
    count++;
    ContErrorCount = 0;
    if(count < countMax){
        load();
    }else{
        clearInterval(QuestionTimers);
        end();
    }
}


window.onload=function() {
    window.scrollTo(0, 0);
    QuestionBankParse('txt/QuestionBank.txt',function (result){
        Question = result;

        for(let i = 0; i < Question.length;i++){
            option = matchOption(strCut(String(Question[i].match(/选项：.*答案：/)),3,3));
            if(option.length == 0){

            }
            if(option.length == 2){
                judgeArr[judgeNum] = Question[i];
                judgeNum++;
            }else {
                if(strCut(String(Question[i].match(/答案：.*/)),3,0).match(/[A-F]/g).length <= 1){
                    optionArr[optionNum] = Question[i];
                    optionNum++;
                }else{
                    checkboxArr[checkboxNum] = Question[i];
                    checkboxNum++;
                }
            }
        }
        setTimeout(function (){
            document.getElementById("loading").style.display='none';
            document.getElementById("startPageButton").style.display='inline';

            let a = 0,b = 0,c = 0;
            let timer2 = setInterval(function (){
                document.getElementById("optionNum").innerHTML= a;
                document.getElementById("checkboxNum").innerHTML= b;
                document.getElementById("judgeNum").innerHTML= c;
                document.getElementById("QuestionSum").innerHTML= a+b+c;
                if(a >= optionNum && b >= checkboxNum && c>= judgeNum){
                    clearInterval(timer2);
                }
                if(a < optionNum){
                    a++;
                }
                if(b < checkboxNum){
                    b++;
                }
                if(c < judgeNum){
                    c++;
                }
            },10);
        },1);
        timerInit();
    });
}