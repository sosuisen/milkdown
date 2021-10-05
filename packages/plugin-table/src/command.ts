/* Copyright 2021, Milkdown by Mirone. */
import { Command } from '@sosuisen/prosemirror-commands';
import { Node, NodeType } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { isInTable } from 'prosemirror-tables';

export const exitTable =
    (node: NodeType): Command =>
    (state, dispatch) => {
        if (!isInTable(state)) {
            return false;
        }
        const { $head } = state.selection;
        const pos = $head.after();
        const tr = state.tr.replaceWith(pos, pos, node.createAndFill() as Node);
        tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
        dispatch?.(tr.scrollIntoView());
        return true;
    };
