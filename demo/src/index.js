import React, {Component} from 'react'
import {render} from 'react-dom'

import PreviewUploaer from '../../src';

const maxW = 500;
const maxH = 500;

// custom previewer
const Previewer = ({ base64, width, height }) => {
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

class Demo extends Component {

  handleChange = (base64) => {
    this.setState({ base64 });
    // do other ...
    console.warn('if you want to use the base64, just use `base64` here');
  }

  render() {
    return <div>
      <h1>preview-uploader Demo</h1>
      <PreviewUploaer
        maxW={maxW}
        maxH={maxH}
        onChange={this.handleChange}
        previewComponent={<Previewer />}
      >
        upload
      </PreviewUploaer>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
