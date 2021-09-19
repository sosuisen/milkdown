/* Copyright 2021, Milkdown by Mirone. */
import './style.css';

import { Editor, editorViewOptionsCtx } from '@sosuisen/core';
import { prism } from '@sosuisen/plugin-prism';
import { table } from '@sosuisen/plugin-table';
import { marks, nodes } from '@sosuisen/preset-commonmark';

import { slash } from '../src';

const markdown = `
# Milkdown Test

`;

const root = document.getElementById('app');

if (!root) throw new Error();

Editor.make()
    .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (prev) => ({
            ...prev,
            root,
            defaultValue: markdown,
        }));
    })
    .use(nodes)
    .use(marks)
    .use(prism)
    .use(table)
    .use(slash)
    .create();
