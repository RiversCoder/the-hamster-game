var Game = (function(_super){
    

    //Game类的构造方法
    function Game(){
        
        //初始化地鼠数组
        this.modes = new Array();
        this.modeNum = 9;
        
        //调用父级的构造方法
        Game.super(this);

        //设置进度条的初始值
        this.timeBar.value = 1;

        //设置分数显示 ( 存储射击分数的变量 )
        this.score = 0;
        this.hitCallback = Laya.Handler.create(this,this.getScore,null,false);
        
        //遍历每个老鼠的状态 使之处于单独的运动状态
        for(var i=0;i<this.modeNum;i++){
            this.box = this.getChildByName('item'+i);
            this.mode = new Mode(this.box.getChildByName("normal"),this.box.getChildByName('hit'),14,this.hitCallback,this.box.getChildByName('scoreImg'));
            this.modes.push(this.mode);
        }

        //实例化小锤子的类型
        this.hammer = new Hammer();
        this.addChild(this.hammer);
       

        //this.mode = new Mode(this.normal,this.hit,14);
        // 定期重置 运动状态 和  进度条状态
        // Laya.timer.loop(300,this,this.onLoop);
        this.initStart();

        //点击游戏结束按钮 重新开始游戏
        this.gameOverImg.on(Laya.Event.CLICK,this,this.initStart);
    }

    //注册类
    Laya.class(Game,"Game",_super);
    
    //Game类的原型方法
    var _proto = Game.prototype;

    _proto.onLoop = function(){
        //this.mode.show();

        //递减百分比状态栏的值
        this.timeBar.value -= (1/90);
       
        if(this.timeBar.value <= 0){
            this.gameOver();
            return;
        }

        //初始化地鼠运动状态
        this.index = Math.floor(Math.random()*this.modeNum);
        this.modes[this.index].show();
    }

    //游戏结束
    _proto.gameOver = function(){
        
        Laya.timer.clear(this,this.onLoop);

        //进入游戏结束界面
        if(!LayaSample.gameOver){
            LayaSample.gameOver = new GameOver();
        }
        
        //居中显示
        LayaSample.gameOver.centerX = 0;
        LayaSample.gameOver.centerY = 40;

        //显示最后分数
        LayaSample.gameOver.setEndScore(this.score);

        //添加到舞台
        Laya.stage.addChild(LayaSample.gameOver);


       // this.gameOverImg.visible = false;
        //Laya.Tween.to(this.gameOverImg,{y:81},300,Laya.Ease.backInOut);
        //锤子变成鼠标
        this.hammer.visible = false;
        this.hammer.end();
        console.log('游戏结束');
    }

    //获取得分
    _proto.getScore = function(type){

        this.score += (type == 1 ? -100 : 100);
        if(this.score <= 0){
            this.score = 0;
        }

        //更新UI界面上的分数
        this.updateScoreUI();
    }   

    //更新UI分数
    _proto.updateScoreUI = function(){
         this.data = {};
         this.temp = this.score;
         for(var i=9;i>=0;i--){
            this.data['item'+i] = {index: Math.floor(this.temp%10)};
            this.temp/=10;
         }
         this.scoreNumber.dataSource = this.data;
    }

    //初始化游戏开始
    _proto.initStart = function(){
         Laya.Tween.to(this.gameOverImg,{y:570},300,Laya.Ease.elasticOut);
         this.gameOverImg.visible = false;
         Laya.timer.loop(300,this,this.onLoop);
         this.timeBar.value = 1;
         this.score = 0;
         this.updateScoreUI();
         this.hammer.visible = false;
         this.hammer.start();
    }


    return Game;

})(ui.GameUI);

