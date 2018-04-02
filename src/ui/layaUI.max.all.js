var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.timeBar=null;
		    this.gameOverImg=null;
		    this.scoreNumber=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":14,"x":5,"width":794,"skin":"comp/back.png","height":581}},{"type":"Box","props":{"y":200,"x":153,"name":"item0"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-01.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":196,"x":348,"name":"item1"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-02.png"}},{"type":"Image","props":{"y":23,"x":61,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":203,"x":562,"name":"item2"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-03.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":294,"x":121,"name":"item3"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-04.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":300,"x":355,"name":"item4"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-05.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":296,"x":565,"name":"item5"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-06.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":399,"x":115,"name":"item6"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-07.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":405,"x":352,"name":"item7"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-08.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":407,"x":585,"name":"item8"},"child":[{"type":"Image","props":{"y":2,"x":0,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":14,"x":0,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":82,"x":-6,"skin":"comp/mask-09.png"}},{"type":"Image","props":{"y":24,"x":59,"width":86,"skin":"comp/score_2.png","name":"scoreImg","height":30,"anchorY":0.5,"anchorX":0.5}}]},{"type":"ProgressBar","props":{"y":3,"x":6,"var":"timeBar","value":1,"skin":"comp/progress_time.png"}},{"type":"Image","props":{"y":540,"x":153,"visible":false,"var":"gameOverImg","skin":"comp/gameover.png"}},{"type":"Box","props":{"y":40,"x":31,"var":"scoreNumber"},"child":[{"type":"Clip","props":{"skin":"comp/clip_number.png","name":"item0","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"y":0,"x":18,"skin":"comp/clip_number.png","name":"item1","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":36,"skin":"comp/clip_number.png","name":"item2","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":54,"skin":"comp/clip_number.png","name":"item3","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":72,"skin":"comp/clip_number.png","name":"item4","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":90,"skin":"comp/clip_number.png","name":"item5","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":108,"skin":"comp/clip_number.png","name":"item6","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":126,"skin":"comp/clip_number.png","name":"item7","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":144,"skin":"comp/clip_number.png","name":"item8","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":162,"skin":"comp/clip_number.png","name":"item9","index":0,"clipX":10,"autoPlay":false}}]}]};
		return GameUI;
	})(View);
var GameinitUI=(function(_super){
		function GameinitUI(){
			
		    this.startBtn=null;

			GameinitUI.__super.call(this);
		}

		CLASS$(GameinitUI,'ui.GameinitUI',_super);
		var __proto__=GameinitUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameinitUI.uiView);

		}

		GameinitUI.uiView={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":75,"x":47,"skin":"comp/help.png"}},{"type":"Button","props":{"y":447,"x":302,"var":"startBtn","stateNum":2,"skin":"comp/btn_start.png"}}]};
		return GameinitUI;
	})(View);
var GameoverUI=(function(_super){
		function GameoverUI(){
			
		    this.restartBtn=null;
		    this.scoreNumber=null;

			GameoverUI.__super.call(this);
		}

		CLASS$(GameoverUI,'ui.GameoverUI',_super);
		var __proto__=GameoverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverUI.uiView);

		}

		GameoverUI.uiView={"type":"View","props":{"width":500,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"skin":"comp/overBg.png","height":400,"sizeGrid":"17,13,16,14"}},{"type":"Image","props":{"y":30,"x":35,"skin":"comp/total Score.png"}},{"type":"Button","props":{"y":287,"x":161,"var":"restartBtn","stateNum":2,"skin":"comp/btn_restart.png","label":"label"}},{"type":"Box","props":{"y":165,"x":160,"var":"scoreNumber"},"child":[{"type":"Clip","props":{"skin":"comp/clip_number.png","name":"item0","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"y":0,"x":18,"skin":"comp/clip_number.png","name":"item1","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":36,"skin":"comp/clip_number.png","name":"item2","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":54,"skin":"comp/clip_number.png","name":"item3","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":72,"skin":"comp/clip_number.png","name":"item4","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":90,"skin":"comp/clip_number.png","name":"item5","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":108,"skin":"comp/clip_number.png","name":"item6","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":126,"skin":"comp/clip_number.png","name":"item7","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":144,"skin":"comp/clip_number.png","name":"item8","index":0,"clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":162,"skin":"comp/clip_number.png","name":"item9","index":0,"clipX":10,"autoPlay":false}}]}]};
		return GameoverUI;
	})(View);
var HammerUI=(function(_super){
		function HammerUI(){
			
		    this.hitMotion=null;
		    this.hammer=null;

			HammerUI.__super.call(this);
		}

		CLASS$(HammerUI,'ui.HammerUI',_super);
		var __proto__=HammerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HammerUI.uiView);

		}

		HammerUI.uiView={"type":"View","props":{"width":100,"height":100},"child":[{"type":"Image","props":{"y":69,"x":65,"width":98,"var":"hammer","skin":"comp/hammer.png","rotation":-20,"pivotY":52,"pivotX":58,"height":77},"compId":2}],"animations":[{"nodes":[],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[{"target":2,"keyframes":{"y":[{"value":69,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":67,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":2},{"value":69,"tweenMethod":"backInOut","tween":true,"target":2,"key":"y","index":5}],"rotation":[{"value":-20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":2},{"value":-24,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":5}]}}],"name":"hitMotion","id":2,"frameRate":24,"action":0}]};
		return HammerUI;
	})(View);