/* Copyright 2021, Milkdown by Mirone. */
import { createCmd, createCmdKey } from '@sosuisen/milkdown-core';
import { createNode, createShortcut } from '@sosuisen/milkdown-utils';
import { wrapIn } from '@sosuisen/prosemirror-commands';
import { wrappingInputRule } from 'prosemirror-inputrules';

import { SupportedKeys } from '../supported-keys';

type Keys = SupportedKeys['BulletList'];

export const WrapInBulletList = createCmdKey();

const id = 'bullet_list';
export const bulletList = createNode<Keys>((_, utils) => {
    return {
        id,
        schema: {
            content: 'listItem+',
            group: 'block',
            attrs: {
                collapsed: {
                    default: false,
                },
            },
            parseDOM: [
                {
                    tag: 'ul',
                    getAttrs: (dom) => {
                        if (!(dom instanceof HTMLElement)) {
                            throw new Error();
                        }
                        return { collapsed: dom.dataset.collapsed === 'true' };
                    },
                },
            ],
            toDOM: (node) => {
                return [
                    'ul',
                    {
                        'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                        class: utils.getClassName(node.attrs, 'bullet-list'),
                    },
                    0,
                ];
            },
        },
        parser: {
            match: ({ type, ordered }) => type === 'list' && !ordered,
            runner: (state, node, type) => {
                state
                    .openNode(type, { collapsed: node.collapsed as boolean })
                    .next(node.children)
                    .closeNode();
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state
                    .openNode('list', undefined, { ordered: false, collapsed: node.attrs.collapsed })
                    .next(node.content)
                    .closeNode();
            },
        },
        inputRules: (nodeType) => [wrappingInputRule(/^\s*([-+*])\s$/, nodeType)],
        commands: (nodeType) => [createCmd(WrapInBulletList, () => wrapIn(nodeType))],
        shortcuts: {
            [SupportedKeys.BulletList]: createShortcut(WrapInBulletList, 'Mod-Shift-8'),
        },
    };
});
