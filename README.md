<a href="https://github.com/sexyoung/preview-uploader">
   <img src="https://raw.githubusercontent.com/sexyoung/preview-uploader/master/logo.png" width="300">
</a>

[![npm](https://img.shields.io/npm/v/preview-uploader.svg)](https://www.npmjs.com/package/preview-uploader)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

PreviewUploader 是什麼:
- 一個用來預覽圖片的 React Component
- 100% JavaScript
- 100% Open Source Software
- 前端壓縮圖片大小
- 手機相片自動旋轉正確角度

PreviewUploader 可以讓你設計自己的預覽圖片上傳器，可以自訂上傳的按鈕，並且即時預覽出來，它會回傳壓縮好的 base64 給我們，然後看我們要怎麼使用。

<img src="https://media.giphy.com/media/l0Iy6fW3uaMJgmN2g/giphy.gif" width="100%" />

## 安裝

1. 首先你電腦環境必須要安裝 Node.js (6.9.1 以上佳)，如果沒有，可以使用 [nvm](https://github.com/creationix/nvm) 安裝 Node.js

2. 在你的專案目錄下 `yarn add preview-uploader`.

## 使用

#### 基本

```jsx
import React from 'react';
import PreviewUploaer from 'preview-uploader';
...
<PreviewUploaer>
  按我預覽圖片
</PreviewUploaer>
```

#### 進階
```jsx
import PreviewUploaer from 'preview-uploader';

// custom previewer
const Previewer = ({ base64 }) => {
  return (
    <div
      style={{
        width: `200px`,
        height: `200px`,
        backgroundImage: `url(${base64})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
    />
  );
}

...
<PreviewUploaer
  maxW={500}
  maxH={500}
  onChange={(img) => { console.log(img) }}
  previewComponent={<Previewer />}
>
  按我預覽圖片
</PreviewUploaer>
```

## 屬性
| 屬性             |    型態   |                         預設值 | 說明                                                     |
|------------------|:---------:|-------------------------------:|----------------------------------------------------------|
| maxW             |   number  |                           1000 | 預覽圖最大寬度                                           |
| maxH             |   number  |                           1000 | 預覽圖最大寬度                                           |
| onChange         |  function | base64 => console.warn(base64) | 指定圖片後的事件, 可從 base64 取得圖片內容               |
| previewComponent | Component | {}                             | 預覽可指定Component，可從 this.props.base64 取得圖片內容 |

---

### 錯誤回報

如果使用時發現有錯誤或不能繼續操作, _拜託_ 請到 [這裡回報][issues] 並且明確地指定哪一個操作發生錯誤。


### 加入開發

如果你對這個專案有興趣的話，歡迎直接提出 Pull Request。或自由 Forward 出去！

[issues]: https://github.com/sexyoung/preview-uploader/issues
