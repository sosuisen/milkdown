/* Copyright 2021, Milkdown by Mirone. */
import {
    Complete,
    defaultValueCtx,
    Editor,
    editorViewOptionsCtx,
    MilkdownPlugin,
    rootCtx,
} from '@sosuisen/milkdown-core';
import { clipboard } from '@sosuisen/milkdown-plugin-clipboard';
import { cursor } from '@sosuisen/milkdown-plugin-cursor';
import { emoji } from '@sosuisen/milkdown-plugin-emoji';
import { history } from '@sosuisen/milkdown-plugin-history';
import { listener, listenerCtx } from '@sosuisen/milkdown-plugin-listener';
import { math } from '@sosuisen/milkdown-plugin-math';
import { prism } from '@sosuisen/milkdown-plugin-prism';
import { slash } from '@sosuisen/milkdown-plugin-slash';
import { tooltip } from '@sosuisen/milkdown-plugin-tooltip';
import { gfm } from '@sosuisen/milkdown-preset-gfm';
import { nord } from '@sosuisen/milkdown-theme-nord';

import { codeSandBox } from './codeSandBox';

const complete =
    (callback: () => void): MilkdownPlugin =>
    () =>
    async (ctx) => {
        await ctx.wait(Complete);

        callback();
    };

export const createEditor = (
    root: HTMLElement | null,
    defaultValue: string,
    readOnly: boolean | undefined,
    setEditorReady: (ready: boolean) => void,
    onChange?: (getMarkdown: () => string) => void,
) => {
    const editor = Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, defaultValue);
            ctx.set(editorViewOptionsCtx, { editable: () => !readOnly });
            ctx.set(listenerCtx, { markdown: onChange ? [onChange] : [] });
        })
        .use(nord)
        .use(gfm)
        .use(codeSandBox)
        .use(complete(() => setEditorReady(true)))
        .use(clipboard)
        .use(listener)
        .use(history)
        .use(cursor)
        .use(prism)
        .use(tooltip)
        .use(math)
        .use(emoji)
        .use(slash);

    return editor;
};
