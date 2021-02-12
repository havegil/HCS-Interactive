function CCard(iX,iY,iType,fScalingFactor,oContainer){

    var _bSuspendUpdates = false;
	var _bFolded;
	var _sType;
	var _iX;
	var _iY;
    var _fScaleFactor;
	var _oSprite;
    var _scope;
	var _oContainer;
        
    this._init = function(iX,iY,iType,fScalingFactor,oContainer){
        _iX = iX;
        _iY = iY;
        _bEliminated = false;
        _bFolded = true;
        _sType = iType;
		_oContainer = oContainer;
		
        _oSprite = new createjs.Sprite(s_oGame.spriteSheet,"back");
        if (_iX < CANVAS_WIDTH/2) {
            _oSprite.x = _iX - CANVAS_WIDTH;
        } else { 
            _oSprite.x = CANVAS_WIDTH + _iX;
        };

        _oSprite.y = _iY + Math.floor((Math.random()-0.5)*0);
        _fScaleFactor = fScalingFactor;
        _oSprite.scaleX = _oSprite.scaleY = _fScaleFactor;

        _scope = this;

        _oSprite.on("click", function() {
                this.clicked();
        },_scope);

        _bSuspendUpdates = true;
        s_oGame.suspendUpdates();

        _oContainer.addChild(_oSprite);
        createjs.Tween.get(_oSprite).to({alpha:1, x:_iX, y:_iY}, 500).call(function handleComplete(){
            _bSuspendUpdates = false;
            s_oGame.restartUpdates();
        });
    };
    
    this.unload = function(){
        _oContainer.removeChild(_oSprite);
    };

    this.update = function(){
        
    };

    this.clicked = function(){
        if (_bSuspendUpdates === false && _bFolded) {
            s_oGame.cardClicked(this,_sType);
			if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
				createjs.Sound.play("card");
			}
            this.clickListener();
        };
    }

    this.flipCard = function(){

        if (_bFolded === true) {

            _bSuspendUpdates = true;
            createjs.Tween.get(_oSprite).to({scaleX:0.1}, 200).call(function(){

                _oContainer.removeChild(_oSprite);

                _oSprite = new createjs.Sprite(s_oGame.spriteSheet, _sType);
                _oSprite.x = _iX;
                _oSprite.y = _iY;
                _oSprite.scaleX = _oSprite.scaleY = _fScaleFactor;

                _oContainer.addChild(_oSprite);
                
                createjs.Tween.get(_oSprite).to({scaleX:_fScaleFactor}, 200).call(function(){
                    _bSuspendUpdates = false;
                    _bFolded = false;
                    s_oGame.addFlippedCard();
                    _scope.clickListener();
                },_scope);
            });
        } else {
			if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
				createjs.Sound.play("card");
			}
            _bSuspendUpdates = true;
            createjs.Tween.get(_oSprite).to({scaleX:0.1}, 200).call(function(){

                _oContainer.removeChild(_oSprite);

                _oSprite = new createjs.Sprite(s_oGame.spriteSheet, "back");
                _oSprite.x = _iX;
                _oSprite.y = _iY;
                _oSprite.scaleX = _oSprite.scaleY = _fScaleFactor;

                _oContainer.addChild(_oSprite);
                
                createjs.Tween.get(_oSprite).to({scaleX:_fScaleFactor}, 200).call(function(){
                    _bSuspendUpdates = false;
                    s_oGame.restartUpdates();

                    _bFolded = true;
                    _scope.clickListener();
                    return true;
                },_scope);
            });
        };
    }

    this.clickListener = function(){
        if (_bSuspendUpdates === false) {
            _oSprite.on("click", function() {
                this.clicked();
            },_scope);
        };
    }

    this.display = function(){
        
    };

    this.isFolded = function(){
        return _bFolded;
    };

    this.getType = function(){
        return _sType;
    };

    this.eliminateCard = function(){
        _bSuspendUpdates = true;
        s_oGame.suspendUpdates();

        _oSprite.alpha = 1;
        createjs.Tween.get(_oSprite).to({alpha:0}, 400).call(function handleComplete(){
            _oContainer.removeChild(_oSprite);
            _bSuspendUpdates = false;
            s_oGame.restartUpdates();
        });
    };
    
    this._init(iX,iY,iType,fScalingFactor,oContainer);      
}