import * as React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK, locations } from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import { RichTextEditor, renderRichTextDialog } from '@contentful/field-editor-rich-text';

init((sdk: FieldExtensionSDK) => {
  sdk.window.startAutoResizer();
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(renderRichTextDialog(sdk), document.getElementById('root'));
  } else {
    render(<RichTextEditor sdk={sdk} />, document.getElementById('root'));
  }
});
