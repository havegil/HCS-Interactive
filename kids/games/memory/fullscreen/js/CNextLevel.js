function CNextLevel(){
	var _oMsgText;
	var _oMatchTextScore;
	var _oMsgTimeScore;
	var _oMsgTotalScore
	var _oContinueButton;	
	var _oGroup;
		
	this._init = function(){
		_oGroup = new createjs.Container();
		_oGroup.alpha = 0;
		_oGroup.visible = false;
		s_oStage.addChild(_oGroup);
		
		var oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite("msg_box"));
		oBg.x = 0;
		oBg.y = 0;

		_oMsgText = new createjs.Text(TEXT_LEVELCOMPLETED,"48px walibi0615bold", "#fff200");
		_oMsgText.x = CANVAS_WIDTH/2;
		_oMsgText.y = (CANVAS_HEIGHT/2)- 80;
		_oMsgText.textBaseline = "alphabetic";
		_oMsgText.textAlign = "center";
		_oMsgText.shadow = new createjs.Shadow("#00553d", 3, 3, 2);

		_oMatchTextScore = new createjs.Text(TEXT_MATCH_SCORE,"30px walibi0615bold", "#ffffff");
		_oMatchTextScore.x = CANVAS_WIDTH/2 ;
		_oMatchTextScore.y = (CANVAS_HEIGHT/2) -20;
		_oMatchTextScore.textAlign = "center";
		_oMatchTextScore.textBaseline = "alphabetic";
		_oMatchTextScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);

		_oMsgTimeScore = new createjs.Text(TEXT_TIMEBONUS,"30px walibi0615bold", "#ffffff");
		_oMsgTimeScore.x = CANVAS_WIDTH/2 ;
		_oMsgTimeScore.y = (CANVAS_HEIGHT/2 + 14);
		_oMsgTimeScore.textAlign = "center";
		_oMsgTimeScore.textBaseline = "alphabetic";
		_oMsgTimeScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
		
		_oMsgLevelScore = new createjs.Text(TEXT_LEVEL_SCORE,"34px walibi0615bold", "#ffffff");
		_oMsgLevelScore.x = CANVAS_WIDTH/2 ;
		_oMsgLevelScore.y = (CANVAS_HEIGHT/2 + 50);
		_oMsgLevelScore.textAlign = "center";
		_oMsgLevelScore.textBaseline = "alphabetic";
		_oMsgLevelScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
	
		_oMsgTotalScore = new createjs.Text(TEXT_TOTALSCORE,"48px walibi0615bold", "#ffffff");
		_oMsgTotalScore.x = CANVAS_WIDTH/2 ;
		_oMsgTotalScore.y = (CANVAS_HEIGHT/2 + 120);
		_oMsgTotalScore.textAlign = "center";
		_oMsgTotalScore.textBaseline = "alphabetic";
		_oMsgTotalScore.shadow = new createjs.Shadow("#00553d", 2, 2, 2);
		
		_oGroup.addChild(oBg, _oMsgText, _oMatchTextScore, _oMsgTimeScore, _oMsgLevelScore,_oMsgTotalScore);
		
		_oContinueButton = new CTextButton(500,550,
                                        s_oSpriteLibrary.getSprite('but_menu_bg'),
                                        "CONTINUE",
                                        "walibi0615bold",
                                        "#00553d",
                                        "20",
                                        _oGroup);
        _oContinueButton.addEventListener(ON_MOUSE_UP, this.hide, this);
	};


    this.display = function(iMatchScore,iTimeBonus,iLevelScore,iTotalScore){
        _oMatchTextScore.text = TEXT_MATCH_SCORE+ " = " + iMatchScore;
        _oMsgTimeScore.text = TEXT_TIMEBONUS + " = "+iTimeBonus;
		_oMsgLevelScore.text = TEXT_LEVEL_SCORE + " = "+iLevelScore;
        _oMsgTotalScore.text = TEXT_TOTALSCORE + " " + iTotalScore;

        _oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1},250);
    };
	
	this.hide = function(){
		_oGroup.alpha = 0;
		_oGroup.visible = false;

		trackButtonClick('Memory_Page', 'Button_Continue', undefined);
		s_oGame.nextLevel();
	};

    this.unload = function(){
        _oContinueButton.unload();
        s_oStage.removeChild(_oGroup);
    };
	
	this._init();
}