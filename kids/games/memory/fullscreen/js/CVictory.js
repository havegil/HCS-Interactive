function CVictory(){
	var _oContinueButton; 
	var _oMsgText;
	var _oMsgTotalScore;
	var _oGroup;
	
	this._init = function(){
		_oGroup = new createjs.Container();
		_oGroup.alpha = 0;
		_oGroup.visible = false;
		s_oStage.addChild(_oGroup);
		
		var oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite("msg_box"));

		_oMsgText = new createjs.Text(TEXT_VICTORY,"bold 38px walibi0615bold", "#fff200");
		_oMsgText.x = CANVAS_WIDTH/2;
		_oMsgText.y = (CANVAS_HEIGHT/2)- 80;
		_oMsgText.textBaseline = "alphabetic";
		_oMsgText.textAlign = "center";
		_oMsgText.shadow = new createjs.Shadow("#000000", 3, 3, 2);

		_oMsgTotalScore = new createjs.Text(TEXT_TOTALSCORE ,"italic bold 48px walibi0615bold", "#ffffff");
		_oMsgTotalScore.x = CANVAS_WIDTH/2 +2;
		_oMsgTotalScore.y = (CANVAS_HEIGHT/2 + 50);
		_oMsgTotalScore.textAlign = "center";
		_oMsgTotalScore.textBaseline = "alphabetic";
		_oMsgTotalScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);

		//TEXT_PLAY_AGAIN
		//console.log("CVictory.js")
		_oGroup.addChild(oBg, _oMsgText, _oMsgTotalScore);
		
		_oContinueButton =  new CTextButton(500,600,
                                            s_oSpriteLibrary.getSprite('but_menu_bg'),
                                            TEXT_PLAY_AGAIN,
                                            "walibi0615bold",
                                            "White",
                                            "19",
                                            _oGroup);
        _oContinueButton.addEventListener(ON_MOUSE_DOWN, this.unload, this);
	};

    this.display = function(iTotalScore){
        _oMsgTotalScore.text = TEXT_TOTALSCORE + "\n" + iTotalScore;
		
		_oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1},250);
		
		$(s_oMain).trigger("save_score",iTotalScore);
    };

    this.unload = function(){
        _oContinueButton.unload();
        s_oStage.removeChild(_oGroup);
		trackButtonClick('Memory_Page', 'Button_Play_Again', undefined);
        s_oGame.unload();
    };
	
	this._init();
}