## 前言

:sunflower: :blossom: :tulip:

Node单线程、异步非阻塞I/O模型、V8引擎等特性在现代互联网性能优越，且是基于JavaScript即能实现服务端；

Node越来越备受关注，所以基于前后端分离使用框架 `express 4.X` 、数据库 `Mysql` 、 `MVC模式` 、 `Swagger` 、 `RESTful规范`实现API接口

```
项目结构：

|- config                          数据库配置与连接
|- log                             日志配置与记录
|- /src                            
  |- controller                    MVC中的C层
  |- model                         MVC中的M层
  |- routes                        路由文件
  |- utils                         工具
    |- jwt                         jwt验证
    |- redis                       redis内存数据库
    |- postSetting.js              post请求的依赖
|- index.js                        主要运行文件
|- swagger                         swagger配置
|- package.json                    项目依赖
```




## MVC模式

:sunflower: :blossom: :tulip:

基于前后端而设计开发返回数据，所以View层直接用route替代。运行主文件 `index.js`会依次执行routes -> controller -> model 获取数据




## MySql

:sunflower: :blossom: :tulip:

### window安装Mysql

1. [Mysql官方下载](https://dev.mysql.com/downloads/mysql/)

2. (Mysql使用教程)[http://www.runoob.com/mysql/mysql-install.html]

3. 使用Intelli IDEA 设置可视化Mysql




## Json Web Token（JWT）用户验证

:sunflower: :blossom: :tulip:

### 原理

主要使用密钥+用户信息（非密码）来验证双方  **（该项目密码：1.MD5加密 2.MD5_SUFFIX添加后缀）**

参考文档: [https://www.jianshu.com/p/180a870a308a](https://www.jianshu.com/p/180a870a308a)

作用：通过 URL, POST 参数或者在 HTTP header 通信双方之间以 JSON 对象的形式安全传递信息的方法, 这种通信属于明文通信请别把密码也写入，一般用于Token验证

![](https://devin-huang.github.io/img/pubilc/jwt.png)

`jsonwebtoken` 创建jwt对象 （图中步骤2）

`express-jwt` 验证jwt对象  （图中步骤5）

## log

:sunflower: :blossom: :tulip:

主要使用 `morgan` 完成日志记录，而 `file-stream-rotator` 则用于按照日期区分文件保存日志记录

## Swagger

:sunflower: :blossom: :tulip:

express 里接入 swagger 需要两个包 `swagger-jsdoc` 和` swagger-ui-express` ，前者将 jsdoc 格式的注释转化为 swagger 类型的 json，后者使用这个 json 生产对应的 swagger 页面.接入成功之后我们给接口写的 jsdoc 注释就会自动生成为 swagger 文档页面使用`/api-docs` 查看效果

`swagger/config.js` 基本配置需要注意使用：`swagger： '2.0'`

`swagger/swaggerDoc.js` jsdoc全局配置

`src/routes` jsdoc单独配置

**使用swagger需要token时webpack环境变量设置开发环境无需验证token即可**

## redis (内存数据库) 

:sunflower: :blossom: :tulip:

作用: 多次请求数据库造成性能开销，如果存储到服务端 Session 消耗内存且会被清空; 而 redis (内存数据库)就是在不访问数据库的基础上获取数据（可以设置过期时间）

### Express 使用 redis

参考文档: [https://github.com/NodeRedis/node_redis](https://github.com/NodeRedis/node_redis)

具体参考: `src/utils/redis`

### windows 安装 redis

redis官网仅是linux安装教程，window须在github下载zip后缀文件 [https://github.com/microsoftarchive/redis/tags](https://github.com/microsoftarchive/redis/tags)

#### 安装

解压并使用管理员身份启动CMD在解压后的redis根目录 `redis-server.exe redis.windows.conf` 安装 Redis 并启动

#### 启动

虽已启动 redis，但是只要关闭CMD窗口即停止redis。所以要把redis设置成windows下的服务，在初始启动后会一直运行

`redis-server --service-install redis.windows.conf`

#### 测试

我的电脑 》 管理 》 服务于应用程序 》 服务 》 redis (如果禁用启动为手动)

#### 工具

安装 RedisDesktopManager 可视化工具

#### 设置密码 (默认密码为空)

1. 根目录启动 `redis-cli.exe`

2. 查看当前密码 `config get requirepass`

3. 设置密码

```
- redis.windows.conf 和 redis.windows-service.conf 两个配置文件。
- 在配置文件中找到 # requirepass foobared 并在下方填入密码

- for example:
# requirepass foobared
requirepass 123

- 重启 Redis 生效

- CMD 到 Redis 的安装路径
- 输入指令：redis-cli.exe -h 127.0.0.1 -p 6379 -a 123
-h: 是指地址 127.0.0.1 指的是本地，如果是远程的就写远程的地址
-p: 这边是端口号，具体看个人的配置 redis.windows.conf 里面的，默认是 6379
-a: 密码和 -p 一样，没设置就不用写 -a
- 成功则弹出：requirepass 123
```

## webapck

:sunflower: :blossom: :tulip:
