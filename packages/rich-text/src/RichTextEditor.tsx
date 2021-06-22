import React, { useCallback, useState } from 'react';
import { toContentfulDocument, toSlatejsDocument } from '@contentful/contentful-slatejs-adapter';
import * as Contentful from '@contentful/rich-text-types';
import { EntityProvider } from '@contentful/field-editor-reference';
import { css, cx } from 'emotion';
import { styles } from './RichTextEditor.styles';
import { FieldExtensionSDK, FieldConnector } from '@contentful/field-editor-shared';
import schema from './constants/Schema';
import deepEquals from 'fast-deep-equal';
import Toolbar from './Toolbar';
import StickyToolbarWrapper from './Toolbar/StickyToolbarWrapper';
import { withListOptions } from './plugins/List';
import { SlatePlugins, createHistoryPlugin, createReactPlugin } from '@udecode/slate-plugins-core';
import { createListPlugin } from '@udecode/slate-plugins-list';
import { createHrPlugin, withHrOptions } from './plugins/Hr';
import { withHeadingOptions, createHeadingPlugin } from './plugins/Heading';
import { createBoldPlugin, withBoldOptions } from './plugins/Bold';
import { withCodeOptions, createCodePlugin } from './plugins/Code';
import { withItalicOptions, createItalicPlugin } from './plugins/Italic';
import { createUnderlinePlugin, withUnderlineOptions } from './plugins/Underline';
import { withTableOptions } from './plugins/Table';
import { createTablePlugin } from '@udecode/slate-plugins-table';

type ConnectedProps = {
  editorId?: string;
  sdk: FieldExtensionSDK;
  minHeight?: string | number;
  value?: object;
  isDisabled?: boolean;
  onChange?: (doc: Contentful.Document) => unknown;
  onAction?: () => unknown;
  isToolbarHidden?: boolean;
  actionsDisabled?: boolean;
};

const plugins = [
  // Core
  createReactPlugin(),
  createHistoryPlugin(),

  // Elements
  createListPlugin(),
  createHrPlugin(),
  createHeadingPlugin(),
  createTablePlugin(),

  // Marks
  createBoldPlugin(),
  createCodePlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
];

const options = {
  // Elements
  ...withListOptions,
  ...withHrOptions,
  ...withHeadingOptions,
  ...withTableOptions,

  // Marks
  ...withBoldOptions,
  ...withCodeOptions,
  ...withItalicOptions,
  ...withUnderlineOptions,
};

const ConnectedRichTextEditor = (props: ConnectedProps) => {
  const document = toSlatejsDocument({
    document: {
      "nodeType": Contentful.BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          "nodeType": Contentful.BLOCKS.TABLE,
          "data": {},
          "content": [
            {
              "nodeType": Contentful.BLOCKS.TABLE_ROW,
              "data": {},
              "content": [
                {
                  "nodeType": Contentful.BLOCKS.TABLE_CELL,
                  "data": {},
                  "content": [
                    {
                      "nodeType": Contentful.BLOCKS.PARAGRAPH,
                      "data": {},
                      "content": [
                        {
                          "nodeType": "text",
                          "value": "hello",
                          "data": {},
                          "marks": []
                        }
                      ]
                    },
                  ],
                },
                {
                  "nodeType": Contentful.BLOCKS.TABLE_CELL,
                  "data": {},
                  "content": [
                    {
                      "nodeType": Contentful.BLOCKS.PARAGRAPH,
                      "data": {},
                      "content": [
                        {
                          "nodeType": "text",
                          "value": "world",
                          "data": {},
                          "marks": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "nodeType": Contentful.BLOCKS.TABLE_ROW,
              "data": {},
              "content": [
                {
                  "nodeType": Contentful.BLOCKS.TABLE_CELL,
                  "data": {},
                  "content": [
                    {
                      "nodeType": Contentful.BLOCKS.PARAGRAPH,
                      "data": {},
                      "content": [
                        {
                          "nodeType": "text",
                          "value": "otter",
                          "data": {},
                          "marks": []
                        }
                      ]
                    },
                  ],
                },
                {
                  "nodeType": Contentful.BLOCKS.TABLE_CELL,
                  "data": {},
                  "content": [
                  {
                      "nodeType": Contentful.BLOCKS.PARAGRAPH,
                      "data": {},
                      "content": [
                        {
                          "nodeType": "text",
                          "value": "bear",
                          "data": {},
                          "marks": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    },
    schema,
  });

  const [value, setValue] = useState(document);

  const classNames = cx(
    styles.editor,
    props.minHeight !== undefined ? css({ minHeight: props.minHeight }) : undefined,
    props.isDisabled ? styles.disabled : styles.enabled,
    props.isToolbarHidden && styles.hiddenToolbar
  );

  return (
    <div className={styles.root} data-test-id="rich-text-editor">
      <SlatePlugins
        id={props.editorId}
        initialValue={value}
        plugins={plugins}
        editableProps={{
          className: classNames,
        }}
        onChange={(newValue) => {
          setValue(newValue);
          const doc = toContentfulDocument({ document: newValue, schema });
          props.onChange?.(doc);
        }}
        options={options}>
        {!props.isToolbarHidden && (
          <StickyToolbarWrapper isDisabled={props.isDisabled}>
            <Toolbar isDisabled={props.isDisabled} />
          </StickyToolbarWrapper>
        )}
      </SlatePlugins>
    </div>
  );
};

type Props = ConnectedProps & { isInitiallyDisabled: boolean };

const RichTextEditor = (props: Props) => {
  const { sdk, isInitiallyDisabled, ...otherProps } = props;
  const isEmptyValue = useCallback(
    (value) => !value || deepEquals(value, Contentful.EMPTY_DOCUMENT),
    []
  );
  return (
    <EntityProvider sdk={sdk}>
      <FieldConnector
        throttle={0}
        field={sdk.field}
        isInitiallyDisabled={isInitiallyDisabled}
        isEmptyValue={isEmptyValue}
        isEqualValues={deepEquals}>
        {({ lastRemoteValue, disabled, setValue, externalReset }) => (
          <ConnectedRichTextEditor
            {...otherProps}
            // TODO: do we still need this with ShareJS gone?
            // on external change reset component completely and init with initial value again
            key={`rich-text-editor-${externalReset}`}
            value={lastRemoteValue}
            sdk={sdk}
            isDisabled={disabled}
            onChange={setValue}
          />
        )}
      </FieldConnector>
    </EntityProvider>
  );
};

export default RichTextEditor;
