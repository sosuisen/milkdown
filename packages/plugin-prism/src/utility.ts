/* Copyright 2021, Milkdown by Mirone. */
import { findChildren } from '@sosuisen/utils';

export const findBlockNodes = findChildren((child) => child.isBlock);
