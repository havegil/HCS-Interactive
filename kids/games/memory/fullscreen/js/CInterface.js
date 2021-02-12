function CInterface(szTimeLeft){

    var _oTimeLeft;
    var _oTimeLeft; 
    var _oScore;
    var _oAudioToggle;
    var _szTimeLeft;
    var _oButExit;
    
    this._init = function(szTimeLeft){

        _szTimeLeft = TEXT_TIMELEFT + szTimeLeft;
        _oTimeLeft = new createjs.Text(_szTimeLeft, "36px walibi0615bold", "#ffffff");
        _oTimeLeft.x = 25 + 5;
        _oTimeLeft.y = 50 + 25;
        _oTimeLeft.textBaseline = "alphabetic";
        // _oTimeLeft.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
        s_oStage.addChild(_oTimeLeft);

        _szScore = TEXT_SCORE + 0;
        _oScore = new createjs.Text(_szScore, "36px walibi0615bold", "#ffffff");
        _oScore.x = CANVAS_WIDTH/2;
        _oScore.y = 50 + 25;
        _oScore.textAlign = "center";
        _oScore.textBaseline = "alphabetic";
        // _oScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
        s_oStage.addChild(_oScore);

		_oScoreMultText = new createjs.Text("X2", "150px walibi0615bold", "#ffffff");
		_oScoreMultText.textAlign = "center";
		_oScoreMultText.textBaseline = "alphabetic";
		_oScoreMultText.x = CANVAS_WIDTH/2;
		_oScoreMultText.y = CANVAS_HEIGHT/2;
		// _oScoreMultText.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
		_oScoreMultText.scaleX = _oScoreMultText.scaleY = 0.1;
		_oScoreMultText.visible = false;
		s_oStage.addChild(_oScoreMultText);
		
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(CANVAS_WIDTH - (oSprite.width/2) - 20,(oSprite.height/2) + 30,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite2 = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite2.width/2)*2 - 10,(oSprite2.height/2) + 30,oSprite2);
			_oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
    };
    
    this.unload = function(){
		if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
			_oAudioToggle.unload();
		}
        _oButExit.unload();

        s_oStage.removeChild(_oTimeLeft);
        s_oStage.removeChild(_oScore);
    };

    this.refreshScore = function(iScore){
        _oScore.text = TEXT_SCORE + iScore;
    };
	
	this.showMultiplier  = function(iMult){
		_oScoreMultText.text = "X"+iMult;
		_oScoreMultText.visible = true;
		
		createjs.Tween.get(_oScoreMultText).to({scaleX:1,scaleY:1}, 300,createjs.Ease.cubicOut).call(function(){
																createjs.Tween.get(_oScoreMultText).to({scaleX:0.1,scaleY:0.1}, 300,createjs.Ease.cubicIn).call(function(){_oScoreMultText.visible = false;}); 
															});  
	};

    this.update = function(szTimeLeft){
        _oTimeLeft.text = TEXT_TIMELEFT + szTimeLeft;
    };

    this._onExit = function(){
        //s_oGame.unload();
		//window.location.href="/kids/index.html";
		trackButtonClick('Memory_Page', 'Button_X', undefined);
		window.history.back();
    }
	
	this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    s_oInterface = this;
    
    this._init(szTimeLeft);
    
    return this;
}

var s_oInterface;