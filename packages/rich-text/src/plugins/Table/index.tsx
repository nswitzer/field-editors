import * as React from 'react';
import * as Slate from 'slate-react';
import { css } from 'emotion';
import { BLOCKS } from '@contentful/rich-text-types';
import {
  ELEMENT_TD,
  ELEMENT_TR,
  ELEMENT_TABLE,
} from '@udecode/slate-plugins-table';
import { CustomSlatePluginOptions } from 'types';

const styles = {
  [BLOCKS.TABLE]: css`
    margin: 10px 0;
    borderCollapse: collapse;
    width: 100%;
  `,
  [BLOCKS.TABLE_ROW]: css`
    background-color: var(--ifm-table-background);
    border: var(--ifm-table-border-width) solid var(--ifm-table-border-color);
  `,
  [BLOCKS.TABLE_CELL]: css`
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(193, 199, 208);
    padding: 8px;
    min-width: 48px;
  `,
};

export function createTableElement(Tag, block: BLOCKS) {
  return function Table(props: Slate.RenderElementProps) {
    return (
      <Tag {...props.attributes} className={styles[block]}>
        {props.children}
      </Tag>
    );
  };
}

export const TABLE = createTableElement('table', BLOCKS.TABLE);
export const TR = createTableElement('tr', BLOCKS.TABLE_ROW);
export const TD = createTableElement('td', BLOCKS.TABLE_CELL);

export const withTableOptions: CustomSlatePluginOptions = {
  [ELEMENT_TABLE]: {
    type: BLOCKS.TABLE,
    component: TABLE,
  },
  [ELEMENT_TR]: {
    type: BLOCKS.TABLE_ROW,
    component: TR,
  },
  [ELEMENT_TD]: {
    type: BLOCKS.TABLE_CELL,
    component: TD,
  },
};
