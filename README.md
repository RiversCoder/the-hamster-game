## 使用Layabox引擎制作H5打地鼠游戏

### 游戏运行示意图

![hit hammer game](/folders/screenshot.png "hit hammer game") 

* 完整版游戏试玩 [在线打地鼠游戏demo](https://riverscoder.github.io/the-hamster-game/bin/index.html) 

* 开发该游戏使用的工具： Layabox IDE、 LayaAir引擎、 javascript (es5)

* 游戏过程：游戏前期说明进入游戏、 游戏中期击打老鼠交互内容、 游戏后期得分及重玩、 发布游戏前进行屏幕适配

* 游戏模式：单人模式

### 游戏开发步骤及核心要点

* 使用IDE编辑器初始化游戏项目，进入UI编辑界面，拖拽好UI元素到指定位置，导出
* 在代码面板里面，一系列继承UI父类的的子类，调用父类传递过来的元素对象，实现相关的逻辑操作
* 主要使用原生javascript的prototype进行面向对象开发


#### 步骤 1

* 编辑UI界面 （对老鼠组进行复制到对应的洞口，更换遮挡物图片，然后导出UI代码）
* 随机从某个树洞中出现地鼠 （序列化所有要运动的老鼠和遮挡物，在UI里面设置好要运动的位置，然后在Game类里面初始化每个洞对应的运动及交互形式）
* 随机不同类型的地鼠 （随机生成索引，更换皮肤图片）
* 每个一段时间，随机树洞索引index对应的老鼠调用show方法

#### 步骤 2

> 1. 完成游戏的倒计时

* 使用进度条组件，改变进度条的value值，就可以简单的实现进度条的伸缩动画
* 在每次在外部循环调用游戏开始的时候，就对初始value值为1的进度条自减一定的比例
    
> 2. 左上角显示游戏得分

* 核心：使用LayaBox默认的clip切片组件属性的index值
* 初始：会把长度设置为1个，clipX为10 （把该切片平均分成10份），index默认设为0为初始值
* 打击地鼠，如果打击到蓝色地鼠，扣-100分（ 小于0，就直接等于0 ），如果打击到海盗地鼠，则加100分
* 通过父类Game调用子类的构造方法Mode，然后传入回调方法，每次hit状态启动时，接收type值作为回调的参数，然后在父级的该方法内，接收参数，设置分数值
* 将分数值映射到游戏界面的切片数字图片上面,使用dataSource属性，以及生成对应的参数对象，赋值即可
    
    
    
#### 步骤 3

> 1. 游戏得分飘字效果

* 核心：在击打的时候触发运动动画
* 在每次击打完毕后，之心reset重置方法的时候，初始化分数图片对象的状态( 默认 visible 为 false )
    
> 2. 小锤子锤击地鼠的效果

* 小锤子跟随鼠标移动、鼠标点击,小锤子播放击打动画
* 小锤子跟随鼠标移动，在onmousemove事件下，时刻计算且赋值给小锤子UI对象的位置
* 在舞台上，鼠标进行点击的时候，需要监听onmousedown事件，且在事件下安排播放动画动作
    

#### 步骤 4

* 游戏说明界面，点击开始游戏按钮，进入到游戏界面；新建一个游戏说明UI，然后在该UI类下面的子类的原型上，编写交互方法，在初始化该游戏的时候,游戏说明类，且添加到舞台；当点击开始游戏按钮时，从舞台移除自身，给舞台添加游戏内容，开始游戏

* 制作游戏的结束界面: 再UI操作界面新建游戏结束的的UI，设置好需要的名称后，导出；新建一个GameOver的js类文件,这个类继承ui.GameoverUI组件类，绑定 "重新开始" 按钮的事件操作，移除自身及游戏对象，把游戏说明界面实例添加到舞台；通过再Game类中实例化GameOver类，得到当前分数this.score，游戏结束时初始化分数数据；
    
* 游戏屏幕适配:通过查找layabox官方文档，实现对屏幕缩放的控制，水平垂直对齐居中，自动横屏等设置 ( 可以在官方API查到！ )
 

### 开始游戏界面

![hit hammer game](/folders/gamestart.png "start game") 


### 结束游戏界面

![hit hammer game](/folders/gamend.png "end game")