# CSS 雪碧图使用
> 进入新公司接手一个移动端项目，然而近期发现雪碧图这块经常会根据屏幕尺寸不同而变得选取的位置不太准确
> 纠结了好久不知道问题在哪，然而某一天

## 我看到如下css代码
```css
// 引入雪碧图文件
.shotsprites {
    background: url(/res/img/shotsprites.png) no-repeat;
    display: inline-block;
}

// 特定icon设置
.icon-upload{
	height:3.9rem;
	width:3.9rem;
	background-position: 0 -24.6rem;
}
```

> 看到了吗？ 没有backgroundSize
> 因为项目是用了rem ，屏幕每次改变，雪碧图文件的尺寸如果不改变，backgroundPosition又使用了rem，
> 不出问题才是见了鬼了

## 然后
```css
// 引入雪碧图文件
.shotsprites {
    background: url(/res/img/shotsprites.png) no-repeat;
    display: inline-block;
    background-size: 30rem 30rem;
}

// 特定icon设置
.icon-upload{
	height:3.9rem;
	width:3.9rem;
	background-position: 0 -24.6rem;
}
```
> 为雪碧图文件加了backgroundSize, 让雪碧图适应屏幕 ，完美解决


