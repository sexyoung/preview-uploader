import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findOrientation from 'exif-orientation';

import './preview-uploader.css';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const Previewer = ({ base64, width, height }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${base64})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
    />
  );
}


export default class extends Component {

  constructor() {
    super();
    this.reader = new FileReader();
    this.rotateAngle = 0;
    this.state = {
      width: 0,
      height: 0,
      base64: '',
    }
  }

  static propTypes = {
    maxW:   PropTypes.number,
    maxH:   PropTypes.number,
    children: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    previewComponent: PropTypes.any,
  }
  static defaultProps = {
    maxW: 1000,
    maxH: 1000,
    children: 'click to upload',
    onChange: base64 => console.warn(base64),
    previewComponent: <Previewer />,
  }

  handleChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!/image\/\S+/.test(file.type)) {
        console.error('please assign a image file!');
        return;
      }
      findOrientation(file, (err, ori) => {
        this.rotateAngle = ori.rotate;
        this.reader.readAsDataURL(file);
      });

      this.reader.onload = this.handleImageLoad;
    }
  }

  handleImageLoad = () => {
    imageInfo(this.reader.result).then((result) => {
      const iw = result.width;
      const ih = result.height;
      const scale = (iw > this.props.maxW || ih > this.props.maxH) ?
                    Math.min((this.props.maxW / iw), (this.props.maxH / ih)): 1;

      const iwScaled = iw * scale;
      const ihScaled = ih * scale;
      const rotateAngle = this.rotateAngle;
      const info = getXYInfo({ rotateAngle, iwScaled, ihScaled });
      canvas.width = info.canvasWidth;
      canvas.height = info.canvasHeight;
      ctx.rotate(rotateAngle * (Math.PI / 180));
      ctx.drawImage(result.img, info.x, info.y, iwScaled, ihScaled);
      this.props.onChange(canvas.toDataURL('image/jpeg'));

      this.setState({
        width:  canvas.width,
        height: canvas.height,
        base64: canvas.toDataURL('image/jpeg'),
      });
    });
  }

  render() {
    return (
      <span className="preview-uploader">
        <input type="file" accept="image/*" onChange={this.handleChange} />
        {
          this.state.base64 ?
            React.cloneElement(this.props.previewComponent, this.state) :
            this.props.children
        }
      </span>
    )
  }
}


// helper
function imageInfo(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve({
        img,
        width: img.width,
        height: img.height,
      });
    };

    img.onerror =  () => {
      reject('error');
    };
  });
}

function getXYInfo({ rotateAngle, iwScaled, ihScaled }) {
  const [canvasWidth, canvasHeight] = rotateAngle % 180 ?
      [ihScaled, iwScaled]:
      [iwScaled, ihScaled];

  const x = [0, 90].includes(rotateAngle) ? 0: -iwScaled;
  const y = [0, -90].includes(rotateAngle) ? 0: -ihScaled;

  return {
    x,
    y,
    canvasWidth,
    canvasHeight,
  };
}
