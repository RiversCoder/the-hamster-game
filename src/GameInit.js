var GameInit = (function(_super){
    
    function GameInit()
    {
        GameInit.super(this);

        this.startBtn.on(Laya.Event.CLICK,this,this.onStartGame)
    }

    //注册父类
    Laya.class(GameInit,'GameInit',_super);
    var _proto = GameInit.prototype;

    _proto.onStartGame = function(){
        
        //移除自身
        this.removeSelf();
        
        //如果没有调用游戏实例
        if(!LayaSample.game){
            LayaSample.game = new Game();
        }
        
        //把游戏内容添加到舞台
        Laya.stage.addChild(LayaSample.game);
        LayaSample.game.initStart();
    }

    return GameInit;

})(ui.GameinitUI);