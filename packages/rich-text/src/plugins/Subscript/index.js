import React, { Component } from 'react';
import ToolbarIcon from '../shared/ToolbarIcon';
import markPlugin from '../shared/MarkPlugin';
import markToggleDecorator from '../shared/MarkToggleDecorator';

export const SubscriptPlugin = ({ richTextAPI }) => {
  return markPlugin({
    type: 'subscript',
    tagName: 'sub',
    hotkey: ['mod+,'],
    richTextAPI,
  });
};

class Subscript extends Component {
  render() {
    return <ToolbarIcon {...this.props} />;
  }
}

export default markToggleDecorator({
  type: 'subscript',
  title: 'Subscript',
  icon: 'ArrowDown',
})(Subscript);
