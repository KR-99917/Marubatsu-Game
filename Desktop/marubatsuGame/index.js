//マーク//
const CIRCLE = "⚫︎";
const CROSS = "×";
const ID_LIST = [
["s1","s2","s3"],
["s4","s5","s6"],
["s7","s8","s9"],
];

//ターン数//
let turn =1;
let isRun =true;

function $(id){
    return document.getElementById(id);
}

function isCircle(){
    return turn %2 ===1;
}
function changeNowPlayer(){
    if(isCircle()) $("tool_nowPlayer").innerHTML = CIRCLE + "のターン";
    else $("tool_nowPlayer").innerHTML = CROSS + "のターン";
}
//３つ同じマークか判定//
function isCompleate(firstId,secondId,thirdId){
    // 3つのマス目にマークが入っていなければ、この関数の処理は終了(return)する
    if($(firstId).value ==="" || $(secondId).value ==="" ||$(thirdId).value ==="")return;
    // 3つのマス目のマークが同じマークなら、trueを返す
    if($(firstId).value === $(secondId).value && $(secondId).value === $(thirdId).value)return true;
    // 同じマークでなければfalseを返す
    return false;
}

function compleateMark(){
    let isEnd = false;
    //横一列//
    for(let row=0;row<3; row++){
        isEnd=isCompleate(ID_LIST[row][0],ID_LIST[row][1],ID_LIST[row][2]);
        if(isEnd){
            winLossResults($(ID_LIST[row][0]).value + "の勝利");
            return true;
        }
    }

    //縦一列//
    for(let col=0;col<3; col++){
        isEnd=isCompleate(ID_LIST[0][col],ID_LIST[1][col],ID_LIST[2][col]);
        if(isEnd){
            winLossResults($(ID_LIST[0][col]).value + "の勝利");
            return true;
        }
    }

    //左下り
    isEnd=isCompleate(ID_LIST[0][2],ID_LIST[1][1],ID_LIST[2][0]);
    if(isEnd){
        winLossResults($(ID_LIST[0][2]).value + "の勝利");
        return true;
    }

    //右下り
    isEnd=isCompleate(ID_LIST[0][0],ID_LIST[1][1],ID_LIST[2][2]);
    if(isEnd){
        winLossResults($(ID_LIST[0][0]).value + "の勝利");
        return true;
    }

    //引き分けの場合//
    if(turn>=9){
        winLossResults("引き分け！");
        return true;
    }
    //いずれも揃っていない
    return false;

}
function clickToCheck(e){
    if(!isRun) return;
    let id= e.target.id;
    let object =$(id);
    if(object.value !=="")return;
    if (isCircle()) object.value = CIRCLE;
    else object.value = CROSS;

    if (compleateMark()) return;

    turn++;
    changeNowPlayer();
}

//勝敗結果を表示する
function winLossResults(message){
    isRun=false;
    $("tool_resultText").innerHTML = message;

    $("tool_nowPlayer").style.display = "none";
    $("tool_resultText").style.display = "block";
    }

//やり直し
function resetAction(){
    turn =1;
    changeNowPlayer();
    for(let row=0;row<3; row++){
        for(let col=0;col<3; col++){
        $(ID_LIST[row][col]).value ="";
        }
    }
    winLossResults("");
    $("tool_nowPlayer").style.display = "block";
    $("tool_resultText").style.display = "none";
    isRun=true;
}

function onloadAction(){
    for(let row=0;row<3; row++){
        for(let col=0;col<3; col++){
        $(ID_LIST[row][col]).onclick= clickToCheck;
        }
    }
    $("reset").onclick = resetAction;

    resetAction();
    changeNowPlayer();
}

window.onload=onloadAction;