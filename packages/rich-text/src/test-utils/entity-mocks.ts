import {
  createFakeFieldAPI,
  createFakeSpaceAPI,
  createFakeLocalesAPI,
  createFakeNavigatorAPI,
} from '@contentful/field-editor-test-utils';
import { FieldExtensionSDK } from '@contentful/app-sdk';

import publishedEntry from './fixtures/published_entry.json';
import publishedAsset from './fixtures/published_asset.json';

const newEntitySelectorDummyDialog = (fnName: string, type: string) => async () => {
  return confirm(`sdk.dialogs.${fnName}()\nSimulate selecting a random entity or cancel?`)
    ? {
        sys: {
          id: 'example-entity-id',
          type,
        },
      }
    : Promise.reject(); // Simulate cancellation.
};

export const createEntityMocks = () => {
  const [field, mitt] = createFakeFieldAPI();
  const space = createFakeSpaceAPI();
  const navigator = createFakeNavigatorAPI();

  const sdk = {
    space: {
      ...space,
      getEntry: () => {
        return Promise.resolve(publishedEntry);
      },
      getAsset: () => {
        return Promise.resolve(publishedAsset);
      },
      getEntityScheduledActions: () => {
        return Promise.resolve([]);
      },
      getAssets: () => {
        return Promise.resolve({ items: [publishedAsset] });
      },
    },
    entry: {
      ...publishedEntry,
      getSys: () => publishedEntry.sys,
    },
    field,
    locales: createFakeLocalesAPI(),
    navigator: {
      ...navigator,
      onSlideInNavigation: () => {
        // eslint-disable-next-line
        return () => {};
      },
    },
    dialogs: {
      selectSingleAsset: newEntitySelectorDummyDialog('selectSingleAsset', 'Asset'),
      selectSingleEntry: newEntitySelectorDummyDialog('selectSingleEntry', 'Entry'),
    },
    access: {
      can: (access, entityType) => {
        if (entityType === 'Asset') {
          if (access === 'create') {
            return Promise.resolve(false);
          }
          if (access === 'read') {
            return Promise.resolve(true);
          }
        }
        return Promise.resolve(false);
      },
    },
    parameters: {
      instance: {
        getEntryUrl: () => '#',
      },
    },
    events: [],
  } as unknown as FieldExtensionSDK;

  return { sdk, field, mitt };
};
