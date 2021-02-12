function CNoPortrait(){

    var _oBg;
   
    this._init = function(){
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('no_portrait'));
        s_oStage.addChild(_oBg);        
    };
    
    this.unload = function(){
        s_oStage.removeAllChildren();
    };

    this._init();

}