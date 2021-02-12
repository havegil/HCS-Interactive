function messageBack(x, y, w, h, radius, messageObj, oContainer){
    var _iWidth;
    var _iHeight;
    var _iPosX;
    var _iPosY;
	var _radius;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oButtonBg;
    var _oTextBack;
    var _oText;
    var _oContainer;
	
	this._init = function (x, y, w, h, radius, messageObj, oContainer){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _oContainer = oContainer;

        _oButtonBg = new createjs.Bitmap( oSprite);
        _iWidth    = w;
        _iHeight   = h;
		_iPosY	   = y;
		_iPosX     = x;
		_radius    = radius;
		
        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, "#000000");
        var oBounds = _oTextBack.getBounds();
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "alphabetic";
        _oTextBack.x = oSprite.width/2 + iStepShadow;
        _oTextBack.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) + iStepShadow;

        _oText = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";  
        _oText.x = oSprite.width/2;
        _oText.y = Math.floor((oSprite.height)/2) +(oBounds.height/3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.addChild(_oButtonBg,_oTextBack,_oText);

        _oContainer.addChild(_oButton);

        this._initListener();
	}
	
	this.makeRoundRec = roundRect(x, y, w, h, radius){
	  var r = x + w;
	  var b = y + h;
	  context.beginPath();
	  context.strokeStyle="green";
	  context.lineWidth="4";
	  context.moveTo(x+radius, y);
	  context.lineTo(r-radius, y);
	  context.quadraticCurveTo(r, y, r, y+radius);
	  context.lineTo(r, y+h-radius);
	  context.quadraticCurveTo(r, b, r-radius, b);
	  context.lineTo(x+radius, b);
	  context.quadraticCurveTo(x, b, x, b-radius);
	  context.lineTo(x, y+radius);
	  context.quadraticCurveTo(x, y, x+radius, y);
	  context.stroke();
	}
	  
   this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       _oContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.enable = function(){
        _bDisable = false;
        _oButtonBg.filters = [];

        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
        var matrix = new createjs.ColorMatrix().adjustSaturation(-100);
        _oButtonBg.filters = [
                 new createjs.ColorMatrixFilter(matrix)
        ];
        _oButtonBg.cache(0,0,_iWidth,_iHeight);
		
    };
    
    this._initListener = function(){
       oParent = this;
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("press_but");
        }
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){

        if(_bDisable){
            return;
        }
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.changeText = function(szText){
        _oText.text = szText;
        _oTextBack.text = szText;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };
	
	this._init(x, y, w, h, radius, messageObj, oContainer);
	
	return this;
}

