import React, { Component } from 'react';
import ToolbarIcon from '../shared/ToolbarIcon';
import markPlugin from '../shared/MarkPlugin';
import markToggleDecorator from '../shared/MarkToggleDecorator';

export const SuperscriptPlugin = ({ richTextAPI }) => {
  return markPlugin({
    type: 'superscript',
    tagName: 'sup',
    hotkey: ['mod+.'],
    richTextAPI,
  });
};

class Superscript extends Component {
  render() {
    return <ToolbarIcon {...this.props} />;
  }
}

export default markToggleDecorator({
  type: 'superscript',
  title: 'Superscript',
  icon: 'ArrowUp',
})(Superscript);
