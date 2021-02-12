function CGameOver(){
	var _oMsgTextBack;
	var _oMsgTextScore;
	var _oContinueButton; 
	var _oGroup;
	
	this._init = function(){
		_oGroup = new createjs.Container();
		_oGroup.alpha = 0;
		_oGroup.visible = false;
		s_oStage.addChild(_oGroup);
		
		var oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('msg_box'));
		oBg.x = 0;
		oBg.y = 0;

		_oMsgTextBack = new createjs.Text(TEXT_GAMEOVER,"50px walibi0615bold", "#fff200");
		_oMsgTextBack.x = CANVAS_WIDTH/2;
		_oMsgTextBack.y = (CANVAS_HEIGHT/2) - 80;
		_oMsgTextBack.textBaseline = "alphabetic";
		_oMsgTextBack.textAlign = "center";
		_oMsgTextBack.shadow = new createjs.Shadow("#00553d", 3, 3, 2);

		_oMsgTextScore = new createjs.Text(TEXT_TOTALSCORE+ " 0" ,"bold 48px walibi0615bold", "#fff200");
		_oMsgTextScore.x = CANVAS_WIDTH/2;
		_oMsgTextScore.y = (CANVAS_HEIGHT/2) + 50;
		_oMsgTextScore.textAlign = "center";
		_oMsgTextScore.textBaseline = "alphabetic";
		_oMsgTextScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);
		
		_oGroup.addChild(oBg,_oMsgTextBack,_oMsgTextScore);
	
		_oContinueButton =  new CTextButton(500,550,
                                            s_oSpriteLibrary.getSprite('but_menu_bg'),
                                            TEXT_PLAY_AGAIN,
                                            "walibi0615bold",
                                            "#00553d",
                                            "18",
                                            _oGroup);

        _oContinueButton.addEventListener(ON_MOUSE_UP, this.unload, this);
	}

    this.display = function(iScore){
        _oMsgTextScore.text = TEXT_TOTALSCORE + " " + iScore;
		
		_oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1},250);
		
		$(s_oMain).trigger("save_score",iScore);
    };

    this.unload = function(){
		trackButtonClick('Memory_Page', 'Button_Play_Again', undefined);
        _oContinueButton.unload();
        s_oStage.removeChild(_oGroup);
        s_oGame.unload();
    };
	
	this._init();
}