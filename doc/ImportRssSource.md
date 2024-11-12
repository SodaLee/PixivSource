## 3.导入订阅源

## 3.0 订阅源来源
- [Legado｜开源阅读 | 频道](https://t.me/legado_channels)
- [源仓库](https://www.yckceo.com/yuedu/rss/index.html)
> **更多方式请查看[书源获取方式](./ImportBookSource.md)，一般二者会同时提供**

书源分享【订阅源】：
- [喵公子订阅源](https://yd.mgz6.com)
- [阅读 APP 源](https://legado.aoaostar.com)
- [一程 阅读合集](https://flowus.cn/share/923f5a35-6dcf-47d1-b8eb-b9c5ef3ed39b)


## 3.1 导入订阅源

### A.文件导入更简单
#### 1.下载书源/订阅源文件
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/btsrk.json
```
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/books.json
```

#### 2.使用阅读打开
![img](pic/OpenInLegado.png)

#### 3.导入完成并启用书源/订阅源
![img](./pic/InportRssSourceBtsrk.jpg)


### B.规则订阅易更新
【**开启代理**】后，复制下方的订阅源链接
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/btsrk.json
```
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/books.json
```
#### 1. 打开【订阅】页面，点击【规则订阅】
![img](./pic/SubscribeEntry.jpg)

#### 2. 点击加号，更改规则类型，粘贴链接，保存订阅
**注意这里要把【书源】改成【订阅源】**

![img](./pic/SubscribeRssSourceBtsrk.jpg)


#### 3. 点击相应订阅规则，导入并启用/更新书源
![img](./pic/SubscribeHomePage.jpg)

**首次点击【订阅规则】 即可导入**
![img](./pic/InportRssSourceBtsrk.jpg)
**导入之后，再次点击则会检查更新**


### C.网络导入也方便
请【**开启代理**】后，复制下面的【订阅书源】链接
- btsrk 订阅源
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/btsrk.json
```
- 书源分享 订阅源
```
https://raw.githubusercontent.com/windyhusky/PixivSource/main/books.json
```

#### 1.打开【订阅】页面，点击右上角【设置】
![img](pic/ImportOnlineRssSource1.png)

#### 2.点击右上角的三点菜单，选择【网络导入】
![img](pic/ImportOnlineRssSource2.png)

#### 3.粘贴订阅源链接，点击确定
![img](pic/ImportOnlineRssSource3.jpg)

#### 4.导入完成并启用订阅源
![img](./pic/InportRssSourceBtsrk.jpg)

![img](pic/ImportOnlineRssSource4.jpg)

**无法网络导入时，请尝试开启代理，或过段时间重试**


### D.Schema 链接导入最方便【适用于书源提供方】
大多一键导入书源/订阅源，都是采用了这种方式

#### 0.【书源提供方】为按钮等添加链接
> ```
> 可通过url唤起阅读进行一键导入,url格式: legado://import/{path}?src={url}
> path类型: bookSource,rssSource,replaceRule,textTocRule,httpTTS,theme,readConfig,addToBookshelf
> path类型解释: 书源,订阅源,替换规则,本地txt小说目录规则,在线朗读引擎,主题,阅读排版,添加到书架
> legado://import/addToBookshelf?src={url}
> ```
> 自官方API：https://github.com/gedoor/legado#api-

导入 Pixiv 订阅源的连接如下：
```
yuedu://rsssource/importonline?src=https://raw.githubusercontent.com/windyhusky/PixivSource/main/btsrk.json

legado://import/rssSource?src=https://raw.githubusercontent.com/windyhusky/PixivSource/main/btsrk.json
```

#### 1.点击链接，跳转阅读
浏览器打开：**[喵公子订阅源](https://dy.mgz6.com)**

一键导入按钮的链接，即为下面这条链接：
```
yuedu://rsssource/importonline?src=http://yuedu.miaogongzi.net/shuyuan/miaogongziDY.json
```
点击链接，跳转阅读
![img](pic/OpenInLegado.png)

#### 2.选择订阅源并导入

![img](./pic/InportRssSourceBtsrk.jpg)