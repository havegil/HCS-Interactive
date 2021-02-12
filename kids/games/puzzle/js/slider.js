/* Global Variables */
var canvas = document.getElementById("puzzle-canvas");
var ctx = canvas.getContext("2d");
var canvaswidth;
var canvasheight;
var intervalId;

setCanvasWidth();

var Images=[];

/* Just follow the same pattern if you want to add more or less images...*/
var image1 = new Image(); image1.src = "img/jungle-1.jpg";
var image2 = new Image(); image2.src = "img/jungle-2.jpg";
//var image3 = new Image(); image3.src = "img/gd-3.jpg";
//console.log(image1.width)
/* Just follow the same pattern if you want to add more or less images...*/
Images[0] =[image1];
Images[1] =[image2];
//Images[2] =[image3];

var H = 3;
var W = 3;
function SetupMode(Mode){

	canvas.width = canvaswidth;
	canvas.height = canvasheight;

    if(Mode==1){H = 3; W = 3;}
    else if (Mode==2){H = 4; W = 4;}
    else if (Mode==3){H = 5; W = 5;}
    else if (Mode==4){H = 6; W = 6;}
    else if (Mode==5){H = 7; W = 7;}
    else             {H = 3; W = 3;}
    srcPosition = SliceImage()
    CreatePuzzle();
    Shuffle(200*H);
}

var nextCheck = false;
var previewCheck = false;
var previousCheck = false;
var previewActivated = false;

function onclickLink(e){

    if(nextCheck) {
        if (H<7){
            H ++;
            W ++; 
        }
        puzzle  = [];
        solved  = [];
        correct = [];
        SliderImage = Images[Math.floor((Math.random()*Images.length)+0)]
        srcPosition = SliceImage()
        CreatePuzzle()
        Shuffle(200*H)
        previewActivated = false;
		trackButtonClick('Puzzle Game Page', 'GoodDino_Puzzle_Page:Button_Right');
    }
    else if(previewCheck)    {
		trackButtonClick('Puzzle Game Page', 'GoodDino_Puzzle_Page:Button_Preview');
        if(previewActivated==false){previewActivated=true}
        else{previewActivated=false}
    }
    else if(previousCheck){
        if (H>3){
            H --;
            W --;
        }

        puzzle  = [];
        solved  = [];
        correct = [];
        SliderImage = Images[Math.floor((Math.random()*Images.length)+0)]
        srcPosition = SliceImage()
        CreatePuzzle()
        Shuffle(200*H)
        previewActivated = false;
		trackButtonClick('Puzzle Game Page', 'GoodDino_Puzzle_Page:Button_Left');
    }
    render()
}


var previous = new Image(); previous.src = "img/previous.png";
var preview = new Image(); preview.src = "img/preview.png";
var next = new Image(); next.src = "img/next.png";

var puzzle  = [];
var solved  = [];
var correct = [];

var SliderImage = Images[Math.floor((Math.random()*Images.length)+0)]
var srcPosition = []

/* IE Acts Strange with Mouse Events so we need the check the browser is IE */
var IE = document.all?true:false
var cursor = {X:1000000, Y:1000000};
//if (!IE) document.captureEvents(Event.MOUSEMOVE)
if (!IE) captureEvents(Event.CLICK | Event.MOUSEDOWN | Event.MOUSEUP | Event.TOUCHSTART);

/**-----------*/


/*---------------*/
function getMouseXY(e) {	
	//Apparently if elements are positioned relative, the standard way of getting the x coordinates goes up in smoke, rather it returns the container's coordinates
	var canvasX = $('#img-puzzle').position().left;
	var canvasY = $('#img-puzzle').position().top;
	
	if (e.pageX || e.pageY) {
		cursor.X = e.pageX;
		cursor.Y = e.pageY;
    }
    else {
		cursor.X = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
		cursor.Y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;

    }
	
    // Convert to coordinates relative to the canvas
    cursor.X -= canvas.offsetLeft;
    cursor.Y -= canvas.offsetTop;
	
	cursor.X -= canvasX;
	cursor.Y -= canvasY;
	
	
}


/* OnResize event for fullscreen canvas support */
function onResize(){
	//GN
	$_width  = $('.puzzle .box').width();
	$_height = $('.puzzle .box').height(); 

    canvaswidth = $_width;//window.innerWidth;
    canvasheight = $_height;//window.innerHeight;
    canvas.width = canvaswidth;
    canvas.height = canvasheight;
}


/* Render everything */
function render(){

	ctx.fillStyle ="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="silver";
    ctx.fillRect(2,2,canvas.width-2,canvas.height-3);
    for (y=0; y<puzzle.length; y++){
        for (x=0; x<puzzle[y].length; x++){

            if (puzzle[y][x] == 1){
                var index = solved[y*W+x]
                var DD = index
                var DX = Math.floor(DD/W)
                var DY = DD - DX * W
				
				var imgobj = SliderImage[0];
				var sourceX = srcPosition[index][0];
				var sourceY = srcPosition[index][1];
				var sourceW = srcPosition[index][2];
				var sourceH = srcPosition[index][3];
				var destX = x*Math.ceil(canvas.width/W);
				var destY = canvas.height*0.1+y*Math.ceil(canvas.height*0.9/H);
				var destW = Math.ceil(canvas.width/W);
				var destH = Math.ceil(canvas.height*0.9/H);
				

                ctx.drawImage(  imgobj, 
                                sourceX,
                                sourceY,
                                sourceW,
                                sourceH,
                                destX,
                                destY,
                                destW-2,
                                destH-2)
                
            }
        }
    }
                
    Raster()
	

	/*
	                                destW-1,
                                destH-1)
								
								*/
	
	
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height*0.1+1);
    gradient.addColorStop(0, 'gray');
    gradient.addColorStop(1, 'silver');
    ctx.fillStyle = '#525c65';
    ctx.fillRect(0,0,canvas.width,canvas.height*0.1+1);	
	
	//Previous Button
    ctx.drawImage(previous,0,0,canvas.width*0.12,canvas.height*0.1)
	
	//Next button
    ctx.drawImage(next,canvas.width*0.88,0,canvas.width*0.12,canvas.height*0.1)
	
	// ctx.drawImage(preview,canvas.width*0.35,canvas.height*0.01,canvas.width*0.3,canvas.height*0.08)
    ctx.drawImage(preview,canvas.width*0.35,canvas.height*0.01,canvas.width*0.35,canvas.height*0.08)
	var prevW = 275, prevH=45;	
	var center = (canvas.width - prevW)/2;
	//ctx.drawImage(preview,center,5)
	
	
	
    if(previewActivated==true){
        ctx.globalAlpha = 1;//0.75;
		
		//live
        //ctx.drawImage(SliderImage[0],0,canvas.height*0.1,canvas.width,canvas.height*0.9)
		
		
		//dev
		ctx.drawImage(SliderImage[0],1,canvas.height*0.1,canvas.width-2, (canvas.height -1)*0.9)
    }
	
}


function SliceImage(){

	/* GN The images tends to load at different speed, therefore image width is coming up with a width of zero
	we need to some how check/wait for the image to be fully loaded before attempting to get the width, otherwise we risk getting an IndexSize Error on drawImage method of the canvas elementFromPoint*/
	var menuH = $('.instruct-btns').height()
	var imgW = 580;
	var imgH = 645 - menuH; //645;
	var m = getAspectRatio(imgW, 645, imgW, imgH);
	
	imgW = m[0];
	imgH = m[1];
    array = []
    //width = Math.floor((SliderImage[0].width)/W)                                                  
    //height = Math.floor((SliderImage[0].height)/H)  

    width = Math.floor((imgW)/W)                                                  
    height = Math.floor((imgH)/H)  
	
	console.log(Images[0][0].width);

    for (a=0; a<H*W; a++){
        var DD = a
        var DX = Math.floor(DD/W)
        var DY = DD - DX * W
		
		//bug fix for height issues on mobile
		//var MH = ( (DX*height == 0) || (DX*height == height * 2))? height : (DX*height);
        array.push([DY*width,DX*height,width,height])
        //console.log((DY*width) + "  " + MH + "  w:" + width  + " h: "+ height);
    }                        
    return array
}

function Raster(){
//
    ctx.beginPath();
    ctx.rect(0, canvas.height*0.1, canvas.width,  canvas.height*0.9+1);
    ctx.lineWidth = H/1.5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    for (y=1; y<H; y++){
        ctx.beginPath();
        ctx.moveTo(0 ,canvas.height*0.1+(canvas.height*0.9+1)/H*y);
        ctx.lineTo(canvas.width,canvas.height*0.1+(canvas.height*0.9+1)/H*y);
        ctx.stroke();
    }
    
    for (x=1; x<W; x++){
        ctx.beginPath();
        ctx.moveTo(canvas.width/W*x,canvas.height*0.1);
        ctx.lineTo(canvas.width/W*x,canvas.height+1);
        ctx.stroke();
    }
}

function CreatePuzzle(){

    for (y=0; y<H; y++){
        puzzle[y] = [];
        for (x=0; x<W; x++){
            solved.push(y*W+x)
            correct.push(y*W+x)
            if (y*W+x < W*H-1){
                puzzle[y].push(1)
            }
            else{  			
                puzzle[y].push(0)
            }
        }
    }
}


function Shuffle(Times){
    timesShuffled = 0
    temp=0
    while (timesShuffled < Times){
        y = Math.floor((Math.random()*(H))+0)
        x = Math.floor((Math.random()*(W))+0)
        if (puzzle[y][x] == 1){
            for (m=0; m<puzzle[0].length; m++){
                for (n=0; n<puzzle[0].length; n++){
                    if (puzzle[m][n]==0){
                        if (((x == n+1) && (y == m)) || ((x == n-1) && (y == m)) || ((y == m+1) && (x == n)) || ((y == m-1) && (x == n))){
                            puzzle[m][n] = 1
                            puzzle[y][x] = 0
                            temp = solved[y*W+x]
                            solved[y*W+x] = solved[m*W+n]
                            solved[m*W+n] = temp
                            timesShuffled ++
                        }
                    }
                }
            }
        }
    }
}

function equalLists(list1,list2){
    if(list1.length != list2.length){
        return false;
    }
    else{
        for(i = list1.length; i--;) {
            if(list1[i] != list2[i]){
                return false;
            }
        }
    }
    return true;
}


/* Game Logic */
function action(){

    for (y=0; y<puzzle.length; y++){
        for (x=0; x<puzzle[y].length; x++){
            if (((canvas.width/W)*x < cursor.X) && (cursor.X < (x+1)*(canvas.width/W)) && (canvas.height*0.1+y*(canvas.height*0.9/H) < cursor.Y) && (cursor.Y < canvas.height*0.1+(y+1)*(canvas.height*0.9/H))){
                if (puzzle[y][x] == 1){
                    for (m=0; m<puzzle.length; m++){
                        for (n=0; n<puzzle[m].length; n++){
                            if (puzzle[m][n]==0){
                                if (((x == n+1) && (y == m)) || ((x == n-1) && (y == m)) || ((y == m+1) && (x == n)) || ((y == m-1) && (x == n))){
                                    puzzle[m][n] = 1;
                                    puzzle[y][x] = 0;
                                    temp = solved[y*W+x];
                                    solved[y*W+x] = solved[m*W+n];
                                    solved[m*W+n] = temp;
                                    errorClick = true;
                                    if (equalLists(solved,correct)){
                                        previewActivated = true
                                        //alert("You've beaten this level, you can select another one by pressing the arrows")
										//var strHTML = "<h1>CONGRATULATIONS!</h1><p>You've beaten this level, you can select another one by pressing the arrows</p>";
										//$('.solve-message').html(strHTML);
										$('#hidden_clicker').click();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }               
    }
  
    if(canvas.width*0.75 < cursor.X && cursor.Y < canvas.height*0.1){
        nextCheck = true
        canvas.addEventListener("click", onclickLink, false);
    }else{
		nextCheck = false;
	}
	

    if(canvas.width*0.25 < cursor.X && canvas.width*0.75 > cursor.X && cursor.Y < canvas.height*0.1){
        previewCheck = true
        canvas.addEventListener("click", onclickLink, false);
    }else{
		previewCheck = false;
	}
    
    if(canvas.width*0.25 > cursor.X && cursor.Y < canvas.height*0.1){    
        previousCheck = true
        canvas.addEventListener("click", onclickLink, false);
    }else{
		previousCheck = false
	} 
}


/* Main Function */
var main = function () {
    onResize();
    render();    
};


/*********************************[ JM Code GN] ******************************/
//window.addEventListener("orientationchange", doOrientationChange);
//window.addEventListener("resize", doResizeUpdate, false);
	var timer;
function setCanvasWidth(){
	$_width  = $('.puzzle .box').width();
	$_height = $('.puzzle .box').height();
	
	canvaswidth = $_width;// - 6;//window.innerWidth;
	canvasheight = $_height;// - 6;//window.innerHeight;
	canvas.width = canvaswidth;
	canvas.height = canvasheight;
	
	canvas.addEventListener('mousemove', getMouseXY);
	canvas.addEventListener('touchmove', getMouseXY);
	

}

function doResizeUpdate(e){
	var w  = $('.pants-dance .box').width();
	$_height = $('.pants-dance .box').height();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	clearInterval(intervalId);
	initPuzzle();
}

function initPuzzle(){

	setCanvasWidth();
	canvas.addEventListener('click', action, false)
	
	if ("touchend" in window) {
		canvas.addEventListener('touchend', action, false);
	}
	
	intervalId = setInterval(main, 32);

	SetupMode(1);
	
}

function externalClickMgr(type, e){
	switch(type){
		case 'prev':
			previousCheck =true;
		break;
		case 'view':
			previewCheck =true;
		break;
		case 'next':
			nextCheck =true;
		break;
	}
	onclickLink(e);
}


$('body').on({
    'touchmove': function(e) { 
        //console.log(  "scrolling: "+ $(this).scrollTop()); // Replace this with your code.
		var b = $('#img-puzzle');
	
    }
});

function findPos(obj){
	var posX = obj.offsetLeft;var posY = obj.offsetTop;
	while(obj.offsetParent){
	posX+=obj.offsetParent.offsetLeft;
	posY+=obj.offsetParent.offsetTop;
	if(obj==document.getElementsByTagName('body')[0]){break}
	else{obj=obj.offsetParent;}
	}
	return [posX,posY]
}

function getAspectRatio(mxW, mxH, w, h){
   
        var maxWidth = mxW; // Max width for the image
        var maxHeight = mxH;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = w;    // Current image width
        var height = h;  // Current image height

        // Check if the current width is larger than the max
        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }
		return [width, height];
    
};


  




	
	
	
	






