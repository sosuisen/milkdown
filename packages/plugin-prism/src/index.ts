/* Copyright 2021, Milkdown by Mirone. */
import { prosePluginFactory } from '@sosuisen/milkdown-core';

import { Prism } from './prism';

export const prism = prosePluginFactory(Prism('fence'));
