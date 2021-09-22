/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/milkdown-core';
import { createNode, createShortcut } from '@sosuisen/milkdown-utils';
import { wrappingInputRule } from 'prosemirror-inputrules';
import { liftListItem, popListItem, sinkListItem, splitListItem } from 'prosemirror-schema-list';

import { SupportedKeys } from '../supported-keys';

type Keys =
    | SupportedKeys['SinkListItem']
    | SupportedKeys['LiftListItem']
    | SupportedKeys['PopListItem']
    | SupportedKeys['NextListItem'];

const id = 'list_item';

export const SplitListItem = createCmdKey();
export const SinkListItem = createCmdKey();
export const LiftListItem = createCmdKey();
export const PopListItem = createCmdKey();

export const listItem = createNode<Keys>((_, utils) => {
    const style = utils.getStyle(
        (themeTool) =>
            css`
                &,
                & > * {
                    margin: 0.5rem 0;
                }

                &,
                li {
                    &::marker {
                        color: ${themeTool.palette('primary')};
                    }
                }
            `,
    );

    return {
        id,
        schema: {
            group: 'listItem',
            //            content: 'paragraph block*',
            content: '(paragraph | blockquote | fence | hr | heading)+',
            defining: true,
            parseDOM: [{ tag: 'li' }],
            toDOM: (node) => ['li', { class: utils.getClassName(node.attrs, 'list-item', style) }, 0],
        },
        parser: {
            match: ({ type, checked }) => type === 'listItem' && checked === null,
            runner: (state, node, type) => {
                state.openNode(type);
                state.next(node.children);
                state.closeNode();
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.openNode('listItem');
                state.next(node.content);
                state.closeNode();
            },
        },
        inputRules: (nodeType) => [wrappingInputRule(/^\s*([-+*])\s$/, nodeType)],
        commands: (nodeType) => [
            createCmd(SplitListItem, () => splitListItem(nodeType)),
            createCmd(SinkListItem, () => sinkListItem(nodeType)),
            createCmd(LiftListItem, () => liftListItem(nodeType)),
            createCmd(PopListItem, () => popListItem(nodeType)),
        ],
        shortcuts: {
            [SupportedKeys.NextListItem]: createShortcut(SplitListItem, 'Enter'),
            [SupportedKeys.SinkListItem]: createShortcut(SinkListItem, 'Mod-]'),
            [SupportedKeys.LiftListItem]: createShortcut(LiftListItem, 'Mod-Shift-['),
            [SupportedKeys.PopListItem]: createShortcut(PopListItem, 'Mod-['),
        },
    };
});
