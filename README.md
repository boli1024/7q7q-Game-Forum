# 7Q7Q游戏论坛
---
论坛功能：登录、注册，发帖、回帖、评论，搜索帖子，后台管理系统（url：userAll），玩游戏（HTML游戏）
---
项目使用 Idea 开发，下载压缩包后修改 src/util/Config.java 中的配置项（数据库名，访问数据库的用户名，数据库密码），正确访问数据库后，配置 tomcat 即可成功运行。浏览器访问 127.0.0.1:8080即可访问论坛
---
数据库文件为 7q7q.sql 文件，可直接在 MySQL 数据库中使用 source 命令导入数据。
---
项目目录结构
* 7q7q
* &nbsp;&nbsp; --.idea  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Idea项目文件
* &nbsp;&nbsp; --out   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Idea编译文件保存位置
* &nbsp;&nbsp; --src
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --bean   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统的 bean 文件
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --servlet  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统的 servlet 类
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --test    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统测试
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --util    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 系统核心包
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Comment   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论类
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Config     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 系统使用的数据库的配置文件
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Database   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 数据库基类，其他的实体类均继承于此类
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --EL         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 自定义的 EL 函数
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Game       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游戏类
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Post       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 帖子类
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --Tools      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 工具类，获取实体类对象，获取格式化后的时间等 
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --User       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 用户类
* &nbsp;&nbsp; --web
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --games           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游戏源文件
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --jsp              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsp 页面
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --static           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 页面使用的样式文件、图片等
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --ueditor       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Ueditor富文本编辑器
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --WEB-INF    
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --lib       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   系统使用的 jar 包    
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --ELTag.tld  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   使用自定义 EL 函数的配置文件
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    --web.xml   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  web配置文件
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --index.jsp     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    系统主页的jsp文件
* &nbsp;&nbsp;  --7q7q.iml          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Idea 配置文件
