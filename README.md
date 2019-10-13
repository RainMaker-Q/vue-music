# hello-world

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
# vue-music

以前的项目用的是老版本的vue,这次使用vue2开发了一次。受益匪浅。

1. 在github上找到一个网易云的nodejs版本的接口，部署在了室友的服务器上，这样才有公网IP。然后搭建这个项目访问那个接口来获取网易云的API。
2. 使用了element-ui来做前端的UI.
3. 使用了一个音乐播放器的插件。
4. 使用了一个背景星空图的插件。
5. 使用了一个循环播放图片的插件。



知识点:
1. element-ui的row和col布局可以使用flex来弹性布局。
2. 直接在单页面的`<script>`内倒入相关的组件，就可以在当前页面使用，但是可能需要导入相关的css文件。
3. vue2没有ready钩子函数，使用mounted就可以，在页面渲染结束之后进行某些操作。
4. 用了axios来发送ajax请求请求数据，并使用了ES6的解构语法直接给变量赋值。


