<a href="https://github.com/sexyoung/preview-uploader">
   <img src="https://raw.githubusercontent.com/sexyoung/preview-uploader/master/logo.png" width="300">
</a>

[![npm](https://img.shields.io/npm/v/preview-uploader.svg)](https://www.npmjs.com/package/preview-uploader)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

PreviewUploader is a:
- A React Component what
- 100% JavaScript
- 100% Open Source Software
- Compression at client
- Auto orientation

PreviewUploader can design custom preview image Uploader. You can custom the uploading button style, and see the preview immediately. It can give me a base64 string after assigning an image file, then we can do something.

<img src="https://media.giphy.com/media/l0Iy6fW3uaMJgmN2g/giphy.gif" width="100%" />

## Setup

1. Must to installed Node.js (6.9.1 or up), if you are not installed, you can use [nvm](https://github.com/creationix/nvm) to install Node.js

2. At your project root folder `yarn add preview-uploader`.

## Usage

#### Basic

```jsx
import React from 'react';
import PreviewUploaer from 'preview-uploader';
...
<PreviewUploaer>
  click me to preview
</PreviewUploaer>
```

#### Advanced
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
  click me to preview
</PreviewUploaer>
```

## Props
| Prop             |    Type   |                         Default | Explain                                                     |
|------------------|:---------:|-------------------------------:|----------------------------------------------------------|
| maxW             |   number  |                           1000 | Preview image max width                                           |
| maxH             |   number  |                           1000 | Preview image max height                                           |
| onChange         |  function | base64 => console.warn(base64) | The Event be triggered by assigning a file, it can give me a base64 string.               |
| previewComponent | Component | {}                             | It can put a custom Component, and get a base64 string from this.props.base64 |

---

### Report a bug

If you found a bug, _please_ report to [github issues][issues], and tell me which step triggered an error occurred.


### Join the developer

If you are interested about the repository, welcome you give me a Pull Request or forward.

[issues]: https://github.com/sexyoung/preview-uploader/issues
