var Hammer = (function(_super){
    
    function Hammer(){
        Hammer.super(this);
    };

    //注册父类
    Laya.class(Hammer,'Hammer',_super);

    var _proto = Hammer.prototype;

    //开始使用
    _proto.start = function(){
        
        //隐藏鼠标
        Laya.Mouse.hide();
        this.visible = true;

        //点击开始游戏 实现小锤子按钮跟随鼠标移动
        this.onMouseMove();
        
        //绑定MOUSE_DOWN和MOUSE_MOVE事件
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
    }

    //结束使用
    _proto.end = function(){
       
        //显示鼠标
        Laya.Mouse.show();

        //注销鼠标事件
        Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
    }   

    //系列回调方法
    _proto.onMouseDown = function(){
        
        //播放锤子运动动画
        this.hitMotion.play(0,false);
    }

    _proto.onMouseMove = function(){

        //时刻改变小锤子的位置
        this.pos(Laya.stage.mouseX - this.width/2,Laya.stage.mouseY-this.height/3);
    }

    return Hammer;


})(ui.HammerUI);