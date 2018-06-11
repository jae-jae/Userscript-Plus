![userscript+.gif](https://cdn.rawgit.com/jae-jae/_resources/master/img/userscript+.gif)
# Userscript+

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-up%20to%20date-green.svg)](https://tampermonkey.net/)
[![webpack](https://img.shields.io/badge/webpack-3.x-orange.svg)](https://github.com/webpack/webpack)
[![Vue](https://img.shields.io/badge/Vue-2.4%2B-yellow.svg)](https://vuejs.org/)
[![iView](https://img.shields.io/badge/iView-2.2.0-brightgreen.svg)](https://www.iviewui.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![i18n](https://img.shields.io/badge/i18n-PR-blue.svg)](https://github.com/jae-jae/Userscript-Plus/tree/master/src/common/lang)
[![GitHub stars](https://img.shields.io/github/stars/jae-jae/Userscript-Plus.svg?style=social&label=Star&style=flat-square)](https://github.com/jae-jae/Userscript-Plus)

> Показать пользовательские скрипты (UserJS) для текущего сайта. Легкий способ установить пользовательские скрипты для Tampermonkey. 

**Userscript +** пользовательский скрипт для Tampermonkey, который, когда вы заходите на сайты, автоматически предлагает во всплывающей подсказе в правом нижнем углу скрипты Tampermonkey для текущей страницы, и может установить выбранный скрипт.

Зачастую, мы не знаем, что сайты имеют готовые скрипты для оптимизации страницы или сайта, но **Userscript+** поможет автоматически найти подходящие пользовательские скрипты, и по умолчанию, отсортирует их по рейтингу от высокого к низкому, что даёт тебе новый удобный способ использования `Tampermonkey`!

> - [English description](https://github.com/jae-jae/Userscript-Plus/blob/master/README.md)
>
> - [中文说明](https://github.com/jae-jae/Userscript-Plus/blob/master/README-ZH.md)

## Установка
1. Установите плагин `Tampermonkey` для Chrome/Firefox
 
  Интернет-магазин Chrome: [https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo]( https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  
  Дополнения Firefox: [https://addons.mozilla.org/ru/firefox/addon/tampermonkey](https://addons.mozilla.org/ru/firefox/addon/tampermonkey)
  
2. Установите `Userscript+`

	Вы можете установить этот скрипт через `GreasyFork` или` GitHub`:
    - GreasyFork: [https://greasyfork.org/ru/scripts/24508](https://greasyfork.org/ru/scripts/24508-userscript-show-site-all-userjs)
    - GitHub: [https://github.com/jae-jae/Userscript-Plus/raw/master/dist/show-site-all-userjs.user.js](https://github.com/jae-jae/Userscript-Plus/raw/master/dist/show-site-all-userjs.user.js)

### Userscript+ дополнение для Chrome/Firefox
![](https://raw.githubusercontent.com/jae-jae/_resources/master/img/175033.png)
- Интернет-магазин Chrome:[https://chrome.google.com/webstore/detail/okiocdganiomklllkfkmhneoibegifch](https://chrome.google.com/webstore/detail/okiocdganiomklllkfkmhneoibegifch)

- Github: [https://github.com/jae-jae/Userscript-Plus/raw/master/crx/extension.crx](https://github.com/jae-jae/Userscript-Plus/raw/master/crx/extension.crx)

- Дополнения Firefox: [https://addons.mozilla.org/ru/firefox/addon/userscript-for-tampermonkey](https://addons.mozilla.org/ru/firefox/addon/userscript-for-tampermonkey)

## Что делает:
-  Автоматически отображает значок в правом нижнем углу страницы, рекомендуя скрипты, автоматически исчезает спустя 10 секунд
-  Отфильтровывет 50 скриптов с самым высоким рейтингом
-  Список скриптов имет поисковый фильтр
-  Список скриптов поддерживает произвольную сортировку
-  Поддерживает установку скрипта в один клик
-  Просмотр описания скрипта
-  Показывает ссылки на домашнюю страницу скрипта и автора
-  При нажатии кнопки "закрыть" всплывающий значок больше не появится на всех страницах сайта в `текущей сессии`
-  Всплывающий значок отображается только когда найдены доступные скрипты для текущего сайта
-  Поддержка многоязыковой интернализации i18n. (**[Содействие с локализацией](https://github.com/jae-jae/Userscript-Plus/tree/master/src/common/lang) приветствуется!**)
-  Vue + iView UI отзывчивый и приятный дизайн интерфейса.

## Белый список и Чёрный список
> Редактировать скрипт => Вкладка настроек => Includes/Excludes

В `Tampermonkey`, чтобы войти в интерфейс редактирования скрипта, выберите вкладку` Настройки `, нужная вкладка находится в опциях ` Includes/Excludes `, установите белый и чёрный список, смотрите пример:

![us+en-ex.gif](https://cdn.rawgit.com/jae-jae/_resources/master/img/us+en-ex.gif)

## Известные баги

1. На некоторых сайтах иконка интерфейса плагина не отображается，например: Github
  	
    **Причина**： Это происходит из за того что, политики безопасности этих сайтов не позволяют файлу иконки плагина загрузиться, как результат не позволяя ей корректно отобразиться.
    
## Содействие

Если вы желаете содействовать развитию проекта кодом, пожалуйста, прочитайте следующую [спецификацию стандарта](https://standardjs.com/).

## Лицензия
MIT



