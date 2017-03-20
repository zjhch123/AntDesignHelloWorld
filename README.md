# 使用Webpack+React建立基于Ant Design的页面


> 好吧，其实没有标题写的那么夸张，也就是个HelloWorld…这里记录一下今天的研究历程

## 0. 项目代码
本文所用到的代码已上传[github](https://github.com/zjhch123/AntDesignHelloWorld)，`clone`下来之后进入项目根目录，控制台输入
``` 
npm install
``` 
等待包安装完成后，输入
```
npm start
```
查看效果

## 1. Ant Design是什么
[Ant Design](https://ant.design/) 是蚂蚁金服体验技术中心出品的一个致力于提升『用户』和『设计者』使用体验的中台设计语言。它模糊了产品经理、交互设计师、视觉设计师、前端工程师、开发工程师等角色边界，将进行 UE 设计和 UI 设计人员统称为『设计者』，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。其提供了完整的设计资源，也提供了一套完整的基于React的前端组件。

## 2. 构建
> 使用Webpack + React 进行项目构建。

### 1. 构建基于Webpack的React项目
#### 0. 需要的包
* webpack
* webpack-dev-server
* react
* react-dom
* babel
* babel-preset-react
* babel-preset-es2015
* babel-loader
* babel-core
* css-loader
* style-loader

#### 1. 安装包
1. 首先全局安装webpack和webpack-dev-server，关于webpack的介绍可以参考：[http://webpack.github.io/docs/what-is-webpack.html](http://webpack.github.io/docs/what-is-webpack.html)
``` 
npm install -g webpack webpack-dev-server
```

2. 在项目文件夹路径下，初始化npm项目
``` 
npm init -y
```

3. 安装webpack和webpack-dev-server到项目中
``` 
npm install webpack webpack-dev-server --save-dev
```

4. 安装react和babel的依赖包
``` 
npm install react react-dom babel-loader babel-core babel-preset-react babel-preset-es2015 --save-dev
```

5. 安装剩下的webpack的loader
``` 
npm install css-loader style-loader --save-dev
```
 
#### 2. 构建webpack.config.js
 在项目的根目录新建`webpack.config.js`，并添加以下内容
```javascript
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
}
```

#### 3. 构建package.json
在项目根目录打开`package.json`，在`scripts`内插入
```json
"build": "webpack",
"start": "webpack-dev-server --devtool eval --progress --colors --hot"
```
构建完成后的`package.json`的`scripts`
```json
// 省略
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server --inline --hot"
  },
// 省略
```

#### 4. 构建.babelrc
在项目根目录新建`.babelrc`，输入内容
```javascript
{
    presets:[
        "es2015",
        "react"
    ],
    plugins:[]
}
```

#### 5. 创建index.html和index.js
```html
<!--index.html-->
<!doctype html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<div id="root"></div>
</body>
<script src="bundle.js"></script>
</html>
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>HelloWorld!</h1>,
    document.getElementById("root")
);
```

#### 6. React项目构建完成！
在控制台输入`npm start`，启动项目。项目默认会在8080端口启动。启动完成后，可以在浏览器上输入`http://localhost:8080`查看页面。

![image](https://image.hduzplus.xyz/image/1490016303887.png)

页面使用了`webpack-dev-server`构建，支持热部署。我们可以修改index.js的源码，并不主动刷新的查看浏览器的显示。
![image2](https://image.hduzplus.xyz/image/1490016448694.png)

#### 7. 基于Ant Design的环境

1. 安装`Ant Design`组件库
``` 
npm install antd --save-dev
```

2. 安装`Ant Design`按需加载所需要的`babel`插件`babel-plugin-import`
``` 
npm install babel-plugin-import --save-dev
```

3. 重新编辑`.babelrc`，修改`plugins`的内容
```javascript
{
    presets:[
        "es2015",
        "react"
    ],
    plugins:[
        ["import", {libraryName: "antd", style: "css"}]
    ]
}
```

#### 8. 开始使用Ant Design
修改`index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker, message} from 'antd';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
    }

    handleChange(date) {
        message.info("您选择的日期是" + date.toString());
        this.setState({date: date.toString()})
    }

    render() {
        return (
            <div style={{width: 200, height: 200, margin: '100px auto'}}>
                <DatePicker onChange={value => this.handleChange(value)}/>
                <div>
                    <p>当期日期是: {this.state.date}</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
```

控制台输入
``` 
npm start
```

等待编译完成后，查看浏览器
![ok](https://image.hduzplus.xyz/image/1490017342634.png)

大功告成！

## 3. 之后要做的
可以使用`npm run build`对项目进行打包。
可以配置`loader`来分文件处理js，css，压缩图片等。
我的感想是前端的世界发展的真是太快了…前几年感觉还是茹毛饮血的时代，现在已经有各种自动化工具来帮助开发者辅助开发。能在这个时代使用这些便捷的工具进行开发，真是太棒了！
