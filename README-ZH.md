![userscript+cn.gif](https://cdn.rawgit.com/jae-jae/_resources/master/img/userscript+cn.gif)
# Userscript+

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-up%20to%20date-green.svg)](https://tampermonkey.net/)
[![webpack](https://img.shields.io/badge/webpack-3.x-orange.svg)](https://github.com/webpack/webpack)
[![Vue](https://img.shields.io/badge/Vue-2.4%2B-yellow.svg)](https://vuejs.org/)
[![iView](https://img.shields.io/badge/iView-2.2.0-brightgreen.svg)](https://www.iviewui.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![i18n](https://img.shields.io/badge/i18n-PR-blue.svg)](https://github.com/jae-jae/Userscript-Plus/tree/master/src/common/lang)
[![GitHub stars](https://img.shields.io/github/stars/badges/shields.svg?style=social&label=Star&style=flat-square)](https://github.com/jae-jae/Userscript-Plus)

> 显示当前网站所有的UserJS,一种更容易安装UserJS的方式对于Tampermonkey

**Userscript+** 是一款`Tampermonkey`脚本,作用是当你浏览网页的时候,从右下角自动为你推荐适用于当前页面的`Tampermonkey`脚本，并且可以一键安装指定的脚本。

很多时候，我们并不知道一些网站是否有用户提供用来优化页面的脚本，而**Userscript+** 就能帮你自动寻找适用的UserJS，并默认按照评分高低排序推荐给你,给你带来一种全新的`Tampermonkey`使用体验！

## 安装
1. 安装Chrome插件`Tampermonkey`
 
  Chrome Store: [https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo]( https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  
2. 安装`Userscript+`

	你可以通过`GreasyFork`或者`GitHub`来安装此脚本:
    - GreasyFork: [https://greasyfork.org/zh-CN/scripts/24508](https://greasyfork.org/zh-CN/scripts/24508-userscript-show-site-all-userjs)
    - GitHub: [https://github.com/jae-jae/Userscript-Plus/raw/master/dist/show-site-all-userjs.user.js](https://github.com/jae-jae/Userscript-Plus/raw/master/dist/show-site-all-userjs.user.js)
  
## 特性
-  自动在右下角静默为你推荐脚本，并会在10秒后自动消失
-  筛选评分最高的前50条脚本
-  脚本列表支持自定义排序
-  支持一键安装脚本
- 支持查看脚本详情
- 支持访问脚本首页和作者首页
- 点击关闭按钮后，当前网站的`本次会话`的所有页面都将不会再出现本插件的提示框
- 只有当找到了适用于当前网站的脚本的时候才会显示提示框
- i18n国际化多语言支持
- Vue+iView界面设计流畅漂亮

## 白名单和黑名单
> 脚本编辑界面 => 设置选项卡 => 包含/排除

在`Tampermonkey`中进入到本脚本编辑界面，选择`设置`选项卡,这个选项卡下面有`包含/排除`选项，在这里设置白名单和黑名单,看图:

![userscript+cn+hei2.gif](https://cdn.rawgit.com/jae-jae/_resources/master/img/userscript+cn+hei2.gif)

## 已知Bug

1. 在某些网站下面插件界面图标不显示，如:Github
  	
    **原因**：这是因为这些网站的安全策略阻止了插件图标字体文件的加载，导致图标无法正常显示
   
## 贡献代码

如果你愿意为本项目贡献代码，请遵守[standard](https://standardjs.com/)规范。

## License
MIT


