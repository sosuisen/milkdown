/* Copyright 2021, Milkdown by Mirone. */
import { SupportedKeys as TableKeys } from '@sosuisen/plugin-table';
import { SupportedKeys as CommonmarkKeys } from '@sosuisen/preset-commonmark';

export const SupportedKeys = {
    ...CommonmarkKeys,
    ...TableKeys,
    StrikeThrough: 'StrikeThrough',
    TaskList: 'TaskList',
} as const;
export type SupportedKeys = typeof SupportedKeys;
