var GameOver = (function(_super){

    function GameOver(){
        GameOver.super(this);

        //重新开始按钮点击事件
        this.restartBtn.on(Laya.Event.CLICK,this,this.restart)
    }


    //注册父类
    Laya.class(GameOver,'GameOver',_super);


    //原型方法
    var _proto = GameOver.prototype;

    _proto.restart = function(){
        
        //移除自身以及游戏内容对象
        this.removeSelf();
        LayaSample.game.removeSelf();
        
        //把游戏内容添加到舞台
        Laya.stage.addChild(LayaSample.gameInit);
    }

    //显示结束分数
    _proto.setEndScore = function(score){
         this.data = {};
         this.temp = score;
         for(var i=9;i>=0;i--){
            this.data['item'+i] = {index: Math.floor(this.temp%10)};
            this.temp/=10;
         }
         this.scoreNumber.dataSource = this.data;
    }

    return GameOver;

})(ui.GameoverUI);