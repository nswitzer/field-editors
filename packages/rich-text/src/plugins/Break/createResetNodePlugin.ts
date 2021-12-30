import {
  createResetNodePlugin as createDefaultResetNodePlugin,
  ResetNodePluginRule,
} from '@udecode/plate-reset-node';

import { RichTextPlugin } from '../../types';

export const createResetNodePlugin = (): RichTextPlugin =>
  createDefaultResetNodePlugin({
    then: (editor) => {
      const rules: ResetNodePluginRule[] = editor.plugins.flatMap((p) => {
        return (p as RichTextPlugin).resetNode || [];
      });

      return {
        options: { rules },
      };
    },
  });
