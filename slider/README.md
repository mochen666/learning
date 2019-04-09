# 轮播图组件

## 一、思路一：
见 Slider.jsx

### 基本实现原理：
- 把图片横向排列成组(image row),放置在相框(frame)中，隐藏超出相框的部分。
- 利用图片组左侧和相框左侧的距离(margin-left)改变当前展示在相框中的内容，点击左右按钮可以改变这个距离。

### 无缝循环播放

实现无缝循环播放，我们需要向slider-content中的末尾添加上第1页。如下图

![image](https://upload-images.jianshu.io/upload_images/4740558-a4bc4c718bf876e1.jpg)

### 使用方法

```js
<Swiper width={200} height={100}>
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
</Swiper>
```

参考：https://www.jianshu.com/p/07f36235eb2e

## 思路二：

见 Slider2.jsx

### 实现思路
当前元素使用 center 样式，当前元素的上一个元素使用 left 样式，其它元素使用right 样式。使用定时器，不断切换ptr的指向，然后样式加入适当的transition属性，就形成了最终的轮播效果。

![image](http://laichuanfeng.com/wp-content/uploads/2017/05/carousel_in_reat_1-1024x384.png)