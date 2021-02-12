function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
	var _oExitToggle;
    var _oFade;
    
    this._init = function(){
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);


        var oSprite = s_oSpriteLibrary.getSprite('but_menu_bg');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2),500,oSprite,TEXT_PLAY,"walibi0615bold","#00553d",30,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
		
		var oExitSprite = s_oSpriteLibrary.getSprite('but_exit');
		_oExitToggle = new CGfxButton(CANVAS_WIDTH - (oExitSprite.width/2) - 20,(oExitSprite.height/2) + 20,oExitSprite,s_oStage);
		_oExitToggle.addEventListener(ON_MOUSE_UP, this._onExitToggle, this);	

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
			 
			_oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite.width/2) - 55,(oSprite.height/2) + 20,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);

        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        //s_oStage.addChild(_oFade);//No modal
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
    };
    
    this._onButPlayRelease = function(){
        this.unload();
		trackButtonClick('Memory_Page', 'Button_Play', undefined);
        s_oMain.gotoGame();
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
	
	this._onExitToggle = function(){
        //window.location.href="/kids/index.html";
		trackButtonClick('Memory_Page', 'Button_X', undefined);
		window.history.back();
    };
    
    this._init();
}