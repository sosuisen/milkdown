/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/core';
import { createNode } from '@sosuisen/utils';
import { InputRule } from 'prosemirror-inputrules';
import { Selection } from 'prosemirror-state';

const id = 'hr';
export const InsertHr = createCmdKey<string>();
export const hr = createNode((_, utils) => {
    const style = utils.getStyle(
        (themeTool) => css`
            height: ${themeTool.size.lineWidth};
            background-color: ${themeTool.palette('line')};
            border-width: 0;
        `,
    );
    return {
        id,
        schema: {
            group: 'block',
            parseDOM: [{ tag: 'hr' }],
            toDOM: (node) => ['hr', { class: utils.getClassName(node.attrs, id, style) }],
        },
        parser: {
            match: ({ type }) => type === 'thematicBreak',
            runner: (state, _, type) => {
                state.addNode(type);
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state) => {
                state.addNode('thematicBreak');
            },
        },
        inputRules: (nodeType) => [
            new InputRule(/^(?:---|___\s|\*\*\*\s)$/, (state, match, start, end) => {
                const { tr } = state;

                if (match[0]) {
                    tr.replaceWith(start, end, nodeType.create({}));
                }

                return tr;
            }),
        ],
        commands: (nodeType, schema) => [
            createCmd(InsertHr, () => (state, dispatch) => {
                if (!dispatch) return true;
                const { tr, selection } = state;
                const from = selection.from;
                const node = nodeType.create();
                if (!node) {
                    return true;
                }
                const _tr = tr.replaceSelectionWith(node).insert(from, schema.node('paragraph'));
                const sel = Selection.findFrom(_tr.doc.resolve(from), 1, true);
                if (!sel) {
                    return true;
                }
                dispatch(_tr.setSelection(sel).scrollIntoView());
                return true;
            }),
        ],
    };
});
