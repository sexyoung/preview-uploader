import expect from 'expect'
import React from 'react'
import {render, findDOMNode, unmountComponentAtNode} from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';

import PreviewUploaer from 'src/'

const renderer = new ShallowRenderer();

describe('PreviewUploaer', () => {
  let node;
  let result;

  beforeEach(() => {
    renderer.render(<PreviewUploaer />);
    result = renderer.getRenderOutput();
  })

  it('renders a span with .preview-uploader', () => {
    expect(result.type).toBe('span');
    expect(result.props.className).toBe('preview-uploader');
  });
})
