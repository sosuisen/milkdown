/* Copyright 2021, Milkdown by Mirone. */
import { remarkPluginFactory } from '@sosuisen/core';
import { AtomList } from '@sosuisen/utils';
import remarkEmoji from 'remark-emoji';

import { filter } from './filter';
import { emojiNode } from './node';
import { picker } from './picker';
import { twemojiPlugin } from './remark-twemoji';

export const remarkPlugin = remarkPluginFactory([remarkEmoji, twemojiPlugin]);
export const emoji = AtomList.create([remarkPlugin, emojiNode(), filter(), picker()]);

export { filter } from './filter';
export { emojiNode } from './node';
export { picker } from './picker';
