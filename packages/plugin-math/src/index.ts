/* Copyright 2021, Milkdown by Mirone. */
import { mathBackspaceCmd, mathPlugin } from '@benrbray/prosemirror-math';
import { prosePluginFactory, remarkPluginFactory } from '@sosuisen/core';
import { AtomList } from '@sosuisen/utils';
import { chainCommands, deleteSelection, joinBackward, selectNodeBackward } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import remarkMath from 'remark-math';

import { nodes } from './nodes';

const keys = keymap({
    Backspace: chainCommands(deleteSelection, mathBackspaceCmd, joinBackward, selectNodeBackward),
});

export const math = AtomList.create([
    remarkPluginFactory(remarkMath),
    prosePluginFactory([mathPlugin, keys]),
    ...nodes,
]);
