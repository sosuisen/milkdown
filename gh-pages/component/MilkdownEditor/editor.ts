/* Copyright 2021, Milkdown by Mirone. */
import { Complete, defaultValueCtx, Editor, editorViewOptionsCtx, MilkdownPlugin, rootCtx } from '@sosuisen/core';
import { clipboard } from '@sosuisen/plugin-clipboard';
import { cursor } from '@sosuisen/plugin-cursor';
import { emoji } from '@sosuisen/plugin-emoji';
import { history } from '@sosuisen/plugin-history';
import { listener, listenerCtx } from '@sosuisen/plugin-listener';
import { math } from '@sosuisen/plugin-math';
import { prism } from '@sosuisen/plugin-prism';
import { slash } from '@sosuisen/plugin-slash';
import { tooltip } from '@sosuisen/plugin-tooltip';
import { gfm } from '@sosuisen/preset-gfm';
import { nord } from '@sosuisen/theme-nord';

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
