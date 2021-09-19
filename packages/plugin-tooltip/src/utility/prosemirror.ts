/* Copyright 2021, Milkdown by Mirone. */
import { findParentNode } from '@sosuisen/milkdown-utils';
import type { MarkType, Node, NodeType } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';

export type Position = {
    start: number;
    end: number;
};

export const hasMark = (editorState: EditorState, type: MarkType): boolean => {
    const { from, to } = editorState.selection;

    return editorState.doc.rangeHasMark(from, to, type);
};

export const isTextSelection = (editorState: EditorState): boolean => {
    const { selection } = editorState;
    if (selection instanceof TextSelection) {
        const text = editorState.doc.textBetween(selection.from, selection.to);

        if (!text) return false;

        return true;
    }
    return false;
};

export const isInCodeFence = (editorState: EditorState): boolean =>
    Boolean(findParentNode((node) => node.type.name === 'fence')(editorState.selection));

export const isTextAndNotHasMark = (editorState: EditorState, mark: MarkType): boolean =>
    !isTextSelection(editorState) || isInCodeFence(editorState) || hasMark(editorState, mark);

export const equalNodeType = (nodeType: NodeType, node: Node) => {
    return (Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1) || node.type === nodeType;
};
