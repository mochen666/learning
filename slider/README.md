# 轮播图组件

## 基本实现原理：
- 把图片横向排列成组(image row),放置在相框(frame)中，隐藏超出相框的部分。
- 利用图片组左侧和相框左侧的距离(margin-left)改变当前展示在相框中的内容，点击左右按钮可以改变这个距离。

## 无缝循环播放

实现无缝循环播放，我们需要向slider-content中的末尾添加上第1页。如下图

![image](https://upload-images.jianshu.io/upload_images/4740558-a4bc4c718bf876e1.jpg)

## 使用方法

```js
<Swiper width={200} height={100}>
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
    <img src='https://p2.ssl.qhimg.com/t01d1eb3addf8f4b30e.png' alt='测试' />
</Swiper>
```

参考：https://www.jianshu.com/p/07f36235eb2e