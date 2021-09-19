/* Copyright 2021, Milkdown by Mirone. */
import { Utils } from '@sosuisen/milkdown-utils';
import { Plugin, PluginKey } from 'prosemirror-state';

import { transformAction, WrappedAction } from '../item';
import { createProps } from './props';
import { createStatus } from './status';
import { createView } from './view';

export const key = 'MILKDOWN_PLUGIN_SLASH';

export const createSlashPlugin = (utils: Utils, items: WrappedAction[]) => {
    const status = createStatus();
    const actions = items.map(transformAction);

    return new Plugin({
        key: new PluginKey(key),
        props: createProps(status, utils),
        view: (view) => createView(status, actions, view, utils),
    });
};
