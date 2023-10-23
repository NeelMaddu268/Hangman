var overText1 = document.getElementById("overText1");
var overText2 = document.getElementById("overText2");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
        ctx.moveTo(60, 20);
        ctx.lineTo(60, 150);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(60, 20);
        ctx.lineTo(120, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(120, 20);
        ctx.lineTo(120, 35);
        ctx.stroke();

var words = [];
var missed = 0;
var restart = false;

while (restart){
    $.getJSON('https://random-word-api.herokuapp.com/word?number=30', function(data) {
    restarting(data);
    });
}

function restarting(data){
    restart = false;
    debugger;
}

// $.getJSON('https://random-word-api.herokuapp.com/word?number=30', function(data) {
//     go(data);
//     });

words.sort(() => Math.random() - 0.5);
var ranNum = Math.floor((Math.random()*30)+1);
var selword;
var btns=[];
var val='';
var letters = "abcdefghijklmnopqrstuvwxyz".split("");
var final = "";
var playing = false;

function start(){
    canvas.style.display="block";
    
 selword = words[ranNum];
    try{
        for(var i = 0;i<selword.length;i++){
        final+="_ "
    }}
    catch(err){debugger;location.reload()
            }

    

    document.getElementById('begin').style.display='none';
    var di = document.createElement("DIV");
    di.id="buttons";
    document.body.appendChild(di);
    for(var i = 0;i<letters.length;i++){
        btns[i] = document.createElement("BUTTON");
        btns[i].innerHTML=[letters[i]];
        btns[i].className = "btns";
        btns[i].addEventListener("click",()=>{clicked()});
        btns[i].id=letters[i];
        document.getElementById("buttons").appendChild(btns[i]);
    }
        var other = document.createElement("h2");
    other.id="wordHold";
    other.innerHTML = final;
        document.body.appendChild(other);
}
var guess = [];

function clicked(){
    if(!playing){
        val = event.currentTarget.textContent;
        event.currentTarget.disabled=true;
        event.currentTarget.className="clk";
        guess.push(val);
        check(val)
    }
}
var have = true;

function check(val){
     have = true;
    var splWord = selword.split("");
    //alert(splWord);
    for(var i = 0;i<splWord.length;i++){
        if(splWord[i]==val){
            update(val,i);
            have = false;
        }
    }
    if(have){
        draw(missed)
    }
    have=true;
}

function update(val,pos){
    var z = final;
    //alert(z);
    var other = document.getElementById("wordHold");
var a = z.split("")
//alert(z)
    a[pos*2]=val;
    final = a.join("")
            other.innerHTML = final;
    game()

    
}

function go(da){
    
    for(var i =0;i<da.length;i++){
        words.push(da[i]);
    }
}

function draw(aa){
    missed+=1;
    if(aa==1){
        
        ctx.beginPath();
        ctx.arc(120, 50, 15, 0, 2 * Math.PI);
        ctx.stroke();

        
    }else if(aa==2){
        
        ctx.beginPath();
        ctx.moveTo(120, 65);
        ctx.lineTo(120, 115);
        ctx.stroke();
        
    }else if(aa==3){
        
        ctx.beginPath();
        ctx.moveTo(120, 75);
        ctx.lineTo(90, 95);
        ctx.stroke();
        
    }else if(aa==4){
        
        ctx.beginPath();
        ctx.moveTo(120, 75);
        ctx.lineTo(150, 95);
        ctx.stroke();
        
    }else if(aa==5){
        
        ctx.beginPath();
        ctx.moveTo(120, 115);
        ctx.lineTo(90, 135);
        ctx.stroke();
        
    }else if(aa==6){
        
        ctx.beginPath();
        ctx.moveTo(120, 115);
        ctx.lineTo(150, 135);
        ctx.stroke();
		  gameOver(false);
    }
}

function gameOver(won){
    if(won){
        document.getElementById("overText1").textContent = "You Won";
        document.getElementById("wordHold").style = "none";
    }else{
        document.getElementById("overText1").textContent = "You Lost";
    }
    document.getElementById("overText2").textContent = "The word was "+selword;
    document.getElementById("overText1").style.display = "block";
    document.getElementById("overText2").style.display = "block";
    playing = true;

}

var dones;
function game(){
    dones=true;
    var v = final.split("");

    for(var i = 0;i<v.length;i++){
        if(v[i]=="_"){
            dones=false;
        }
    }if(dones){
        gameOver(true);
    }
}

document.onkeydown=function (e) {
    var keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90){
        typed(e.key)
    }
};

function typed(char){
    if(!playing){
        var buttonSearch = document.getElementById("buttons").children;
        for(var i = 0;i<buttonSearch.length;i++){
            if(buttonSearch[i].id == char){
                var target = buttonSearch[i];
                break;
            }
        }
        //letters.indexOf(char);
        target.disabled=true;
        target.className="clk";
        //event.currentTarget.
        guess.push(char);
        check(char)
    }
}