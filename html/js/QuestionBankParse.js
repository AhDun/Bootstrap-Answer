
function readTextFile(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function matchOption(str){
    let Arr = [];
    let count = 0;
    for(let i = 0; i < str.length - 1; i++){
        if(String(str[i]).match(/[A-F]/) && str[i+1] == '.'){
            let tmp = new String();
            for(i += 2;i < str.length - 1;i++){
                if(String(str[i]).match(/[A-F]/) && str[i + 1] == '.'){
                    i -= 1;
                    break;
                }else{
                    tmp += str[i];
                }
            }
            Arr[count++] = tmp;
        }
    }
    return Arr;
}

function QuestionBankParse(addr,func){
    readTextFile(addr, function(data) {
        let QuestionBank = data.match(/.*/g);
        let QuestionBankArr = [];
        for(let i = 0,j = 0; i < QuestionBank.length;i++){
            if(QuestionBank[i].length > 1){
                QuestionBankArr[j++] = QuestionBank[i];
            }
        }
        //console.log(QuestionBankArr);
        return func(QuestionBankArr);
    });
}
