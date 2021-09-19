/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/core';
import { createNode, createShortcut } from '@sosuisen/utils';
import { setBlockType } from 'prosemirror-commands';

import { SupportedKeys } from '../supported-keys';

type Keys = SupportedKeys['Text'];

export const TurnIntoText = createCmdKey();

const id = 'paragraph';
export const paragraph = createNode<Keys>((options, utils) => {
    const style = options?.headless
        ? null
        : css`
              font-size: 1rem;
              line-height: 1.5;
              letter-spacing: 0.5px;
          `;

    return {
        id,
        schema: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{ tag: 'p' }],
            toDOM: (node) => ['p', { class: utils.getClassName(node.attrs, id, style) }, 0],
        },
        parser: {
            match: (node) => node.type === 'paragraph',
            runner: (state, node, type) => {
                state.openNode(type);
                if (node.children) {
                    state.next(node.children);
                } else {
                    state.addText(node.value as string);
                }
                state.closeNode();
            },
        },
        serializer: {
            match: (node) => node.type.name === 'paragraph',
            runner: (state, node) => {
                state.openNode('paragraph');
                state.next(node.content);
                state.closeNode();
            },
        },
        commands: (nodeType) => [createCmd(TurnIntoText, () => setBlockType(nodeType))],
        shortcuts: {
            [SupportedKeys.Text]: createShortcut(TurnIntoText, 'Mod-Alt-0'),
        },
    };
});
