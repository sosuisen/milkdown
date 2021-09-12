/* Copyright 2021, Milkdown by Mirone. */
import { NodeType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

declare module 'prosemirror-schema-list' {
    export function popListItem<S extends Schema = any>(
        itemType: NodeType<S>,
    ): (state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => boolean;
}
