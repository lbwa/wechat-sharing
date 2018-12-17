# WeChat-sharing

## 参考资料

### 如何测试公众号 - 微信测试号

> 可理解为 ***开发环境*** 下的公众号。

- [公众号管理平台]

- [微信公众平台接口测试帐号]

- [微信公众平台接口调试工具]

[公众号管理平台]:https://mp.weixin.qq.com/

[微信公众平台接口测试帐号]:https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

[微信公众平台接口调试工具]:https://mp.weixin.qq.com/debug/cgi-bin/apiinfo

### 网页授权（静默授权和用户授权）

- [微信网页授权]

  - `openid` 对于同一公众号和同一用户，不论该用户是否已经关注该公众号，均会产生一个恒定的唯一 `openid`（ref: `第二步：通过 code 换取网页授权 access_token` 中关于响应数据的说明）。

[微信网页授权]:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842

### 卡券

- [关于微信卡券与代金券的一些事]

  - 主要区分 ***微信卡券*** （可使用 [微信 JS SDK]）中的代金券与 ***微信支付***（微信商户平台）的代金券。

[微信 JS SDK]:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

- [微信卡券创建流程]

- [微信卡券创建流程 - 文档]

- [微信卡券签名校验工具]

- [卡券签名错误排查]

[关于微信卡券与代金券的一些事]:http://www.voidcn.com/article/p-murevnwy-e.html

[微信卡券创建流程]:http://cj.fangguagua.com/bak/wd/9/4f455120b50741db79b54fde8896b489.html

[微信卡券创建流程 - 文档]:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056

[微信卡券签名校验工具]:https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=cardsign

[卡券签名错误排查]:https://mp.weixin.qq.com/s/WhYpWmfuhUBw2wseTXdt2A

## 项目构建

### 安装依赖

```bash
yarn install
```

### 开发环境编译和热重载
```bash
yarn run serve
```

### 生产环境压缩打包
```bash
yarn run build
```

### 测试
```bash
yarn run test
```

### Lint 代码文件，并修复可自动修复的代码错误
```bash
yarn run lint
```
