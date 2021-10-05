/* Copyright 2021, Milkdown by Mirone. */
import { createCmd, createCmdKey } from '@sosuisen/milkdown-core';
import { createNode, createShortcut } from '@sosuisen/milkdown-utils';
import { wrapIn } from '@sosuisen/prosemirror-commands';
import { wrappingInputRule } from 'prosemirror-inputrules';

import { SupportedKeys } from '../supported-keys';

type Keys = SupportedKeys['OrderedList'];

export const WrapInOrderedList = createCmdKey();

const id = 'ordered_list';
export const orderedList = createNode<Keys>((_, utils) => ({
    id,
    schema: {
        content: 'listItem+',
        group: 'block',
        attrs: {
            order: {
                default: 1,
            },
            collapsed: {
                default: false,
            },
        },
        parseDOM: [
            {
                tag: 'ol',
                getAttrs: (dom) => {
                    if (!(dom instanceof HTMLElement)) {
                        throw new Error();
                    }
                    return {
                        order: dom.hasAttribute('start') ? Number(dom.getAttribute('start')) : 1,
                        collapsed: dom.dataset.collapsed === 'true',
                    };
                },
            },
        ],
        toDOM: (node) => [
            'ol',
            Object.assign(Object.assign({}, node.attrs.order === 1 ? {} : node.attrs.order), {
                'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                class: utils.getClassName(node.attrs, 'ordered-list'),
            }),
            0,
        ],
    },
    parser: {
        match: ({ type, ordered }) => type === 'list' && !!ordered,
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
            state.openNode('list', undefined, { ordered: true, collapsed: node.attrs.collapsed, start: 1 });
            state.next(node.content);
            state.closeNode();
        },
    },
    inputRules: (nodeType) => [
        wrappingInputRule(
            /^(\d+)\.\s$/,
            nodeType,
            (match) => ({ order: Number(match[1]) }),
            (match, node) => node.childCount + node.attrs.order === Number(match[1]),
        ),
    ],
    commands: (nodeType) => [createCmd(WrapInOrderedList, () => wrapIn(nodeType))],
    shortcuts: {
        [SupportedKeys.OrderedList]: createShortcut(WrapInOrderedList, 'Mod-Shift-7'),
    },
}));
