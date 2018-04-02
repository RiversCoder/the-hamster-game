(function(LayaSample){    
    
    (function(LayaSample){
        //初始化引擎
        Laya.init(800,600);

        //屏幕适配
        Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        //设置舞台的背景颜色
        Laya.stage.bgColor = '#fff';
        //加载资源
        Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
    })();

    //初始化游戏到舞台
    function onLoaded(){
        //var game = new Game();
        //Laya.stage.addChild(game);
        LayaSample.gameInit = new GameInit();
        Laya.stage.addChild(LayaSample.gameInit);
    }
    
})(window.LayaSample || (window.LayaSample = {}));


