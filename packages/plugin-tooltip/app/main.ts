/* Copyright 2021, Milkdown by Mirone. */
import './style.css';

import { Editor, editorViewOptionsCtx } from '@sosuisen/milkdown-core';
import { marks, nodes } from '@sosuisen/milkdown-preset-commonmark';

import { tooltip } from '../src';

const markdown = `
# Milkdown Test

## Blockquote

> Milkdown is an editor.

## Marks Paragraph

Hello, ***milkdown* nice \`to\` meet *you***!  
There should be a line break before this.

---

## Image and Link

**Of course you can add image! ![cat](https://th.bing.com/th/id/OIP.EiYMXYhAnpsXnVmwJAq1jAHaEo?pid=ImgDet&rs=1 "kitty")**

Your *[link is here](https://bing.com "bing")*, have a look.

## Lists

* list item 1
    1. is this the real life
    2. is this just fantasy
* list item 2
    * sub list item 1

        some explain

    * sub list item 2
* list item 3

## Code

\`\`\`javascript
const milkdown = new Milkdown();
milkdown.create();
\`\`\`

---

Now you can play!
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
    .use(tooltip)
    .create();
