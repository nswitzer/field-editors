import React from 'react';
import { PlateEditor } from '@udecode/plate';

import { SdkProvider } from '../SdkProvider';
import { createEntityMocks } from './entity-mocks';
import { ConnectedRichTextEditor } from '../RichTextEditor';
import { TrackingProvider } from '../TrackingProvider';
import { ContentfulEditorProvider } from '../ContentfulEditorProvider';

export type TestEditorProps = {
  initialValue?: any;
  editor?: PlateEditor;
};

export const TestEditor = (props: TestEditorProps) => {
  const { sdk } = React.useMemo(() => createEntityMocks(), []);

  return (
    <SdkProvider sdk={sdk}>
      <TrackingProvider
        onAction={() => {
          /* noop */
        }}>
        <ContentfulEditorProvider sdk={sdk}>
          <ConnectedRichTextEditor value={props.initialValue} editor={props.editor} sdk={sdk} />
        </ContentfulEditorProvider>
      </TrackingProvider>
    </SdkProvider>
  );
};
