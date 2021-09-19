/* Copyright 2021, Milkdown by Mirone. */
import { Editor, rootCtx } from '@sosuisen/core';
import { commonmark } from '@sosuisen/preset-commonmark';
import { nord } from '@sosuisen/theme-nord';

export const setup = () => {
    return Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, document.getElementById('app'));
        })
        .use(nord)
        .use(commonmark)
        .create();
};
