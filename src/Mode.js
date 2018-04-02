var Mode = (function(){
    
    function Mode(normalState,hitState,downY,hitCallback,scoreImg){
        this.normal = normalState;
        this.hit = hitState;
        this.dy = downY;
        this.uy = this.normal.y;

        //从父级接收回调
        this.hitCallback = hitCallback;

        //从父级接收分数图片对象 获取图片的纵坐标的值
        this.scoreImg = scoreImg;
        this.scoreY = this.scoreImg.y;

        this.reset();

        //this.normal.on(Laya.Event.CLICK,this,this.hit)
        this.normal.on(Laya.Event.CLICK,this,this.hits);
    };

     var _proto = Mode.prototype;

     //重置动画 初始化游戏状态
     _proto.reset = function(){
        //击打分数图片对象初始化状态
        this.scoreImg.visible = false;
        //正常显示状态初始化
        this.normal.visible = false;
        //被击状态初始化
        this.hit.visible = false;
        //是否处于激活状态
        this.isVctive = false;
        //当前显示状态
        this.isShow = false;
        //被触发点击状态
        this.isHit = false;
     };

     //从下到上显示
     _proto.show = function(){

        //判断是否处于激活状态 如果已经激活 不执行
        if(this.isVctive){
            return;
        }

        this.isVctive = true;
        this.isShow = true;

        //给地鼠添加皮肤类型
        this.type = Math.random() < 0.3 ? 1 : 2;
        this.normal.skin = 'comp/mouse_normal_'+this.type+'.png';
        this.hit.skin = 'comp/mouse_hit_'+this.type+'.png';

        //给对应的皮肤指定对应的分数图片对象
        this.scoreImg.skin = 'comp/score_'+this.type+'.png';

        //从下到上执行运动效果 
        this.normal.y = this.dy;
        this.normal.visible = true;
        Laya.Tween.to(this.normal,{y:this.uy},500,Laya.Ease.backOut,Laya.Handler.create(this,this.showComplete));

     };

     //停留状态
     _proto.showComplete = function(){
        if(this.isShow && !this.isHit){
            Laya.timer.once(2000,this,this.hide);
        }
     };

     //从上到下消失
     _proto.hide = function(){
        if(this.isShow && !this.isHit){
            this.isShow = false;
            Laya.Tween.to(this.normal,{y:this.dy},300,Laya.Ease.backIn,Laya.Handler.create(this,this.reset));
        }
     }

     //点击触发受击
     _proto.hits = function(){
        //console.log(this.isShow,this.isHit);
        if(this.isShow && !this.isHit){
            this.isShow = false;
            this.isHit = true;

            //记录分数
            this.hitCallback.runWith(this.type);

            //动画显示老鼠头上的分数
            this.showScore();

            Laya.timer.clear(this,this.hide);
            this.normal.visible = false;
            this.hit.visible = true;
            Laya.timer.once(500,this,this.reset);
        }
     }

     //打击分数加分/减分动态显示   
     _proto.showScore = function(){
        
        //初始化运动前状态
        this.scoreImg.y = this.scoreY + 30;
        this.scoreImg.scale(0,0);
        this.scoreImg.visible = true;

        //执行运动
        Laya.Tween.to(this.scoreImg,{y:this.scoreY,scaleX:1,scaleY:1},300,Laya.Ease.backOut);
     }

    return Mode;


})();