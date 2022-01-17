/* Copyright 2021, Milkdown by Mirone. */
import { Editor, rootCtx } from '@sosuisen/milkdown-core';
import { clipboard } from '@sosuisen/milkdown-plugin-clipboard';
import { i18n, i18nCtx } from '@sosuisen/milkdown-plugin-i18n';
import { commonmark } from '@sosuisen/milkdown-preset-commonmark';
import { nord } from '@sosuisen/milkdown-theme-nord';

export const setup = () => {
    return Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, document.getElementById('app'));
            ctx.set(i18nCtx, { Meta: 'Ctrl', exitCode: 'Press $1 + Enter to exit from code' });
        })
        .use(clipboard)
        .use(nord)
        .use(i18n)
        .use(commonmark)
        .create();
};
