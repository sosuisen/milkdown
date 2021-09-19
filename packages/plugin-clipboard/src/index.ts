/* Copyright 2021, Milkdown by Mirone. */
import { AtomList } from '@sosuisen/utils';

import { clipboardPlugin } from './clipboard';

export { clipboardPlugin } from './clipboard';

export const clipboard = AtomList.create([clipboardPlugin()]);
