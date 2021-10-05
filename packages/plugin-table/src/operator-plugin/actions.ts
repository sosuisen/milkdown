/* Copyright 2021, Milkdown by Mirone. */
import { themeToolCtx } from '@sosuisen/milkdown-core';
import { Utils } from '@sosuisen/milkdown-utils';
import { Command } from '@sosuisen/prosemirror-commands';
import {
    addColumnAfter,
    addColumnBefore,
    deleteColumn,
    deleteRow,
    deleteTable,
    isInTable,
    selectedRect,
    setCellAttr,
} from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';

import { addRowWithAlignment } from '../utils';
import { getCellSelection, isFirstRowSelected } from './helper';

export type Item = {
    $: HTMLElement;
    command: (e: Event, view: EditorView) => Command;
    disable?: (view: EditorView) => boolean;
};

export enum Action {
    AddColLeft,
    AddColRight,
    AddRowTop,
    AddRowBottom,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Delete,
}

export const createActions: (utils: Utils) => Record<Action, Item> = (utils) => ({
    [Action.AddColLeft]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('leftArrow'),
        command: () => addColumnBefore,
        disable: (view) => !getCellSelection(view).isColSelection(),
    },
    [Action.AddColRight]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('rightArrow'),
        command: () => addColumnAfter,
        disable: (view) => !getCellSelection(view).isColSelection(),
    },
    [Action.AddRowTop]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('upArrow'),
        command: () => (state, dispatch) => {
            if (!isInTable(state)) return false;
            if (dispatch) {
                const rect = selectedRect(state);
                dispatch(addRowWithAlignment(state.tr, rect, rect.top));
            }
            return true;
        },
        disable: (view) =>
            !getCellSelection(view).isRowSelection() ||
            getCellSelection(view).$head.parent.type.name === 'table_header',
    },
    [Action.AddRowBottom]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('downArrow'),
        command: () => (state, dispatch) => {
            if (!isInTable(state)) return false;
            if (dispatch) {
                const rect = selectedRect(state);
                dispatch(addRowWithAlignment(state.tr, rect, rect.bottom));
            }
            return true;
        },
        disable: (view) => !getCellSelection(view).isRowSelection(),
    },
    [Action.AlignLeft]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('alignLeft'),
        command: () => setCellAttr('alignment', 'left'),
        disable: (view) => !getCellSelection(view).isColSelection(),
    },
    [Action.AlignCenter]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('alignCenter'),
        command: () => setCellAttr('alignment', 'center'),
        disable: (view) => !getCellSelection(view).isColSelection(),
    },
    [Action.AlignRight]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('alignRight'),
        command: () => setCellAttr('alignment', 'right'),
        disable: (view) => !getCellSelection(view).isColSelection(),
    },
    [Action.Delete]: {
        $: utils.ctx.get(themeToolCtx).slots.icon('delete'),
        command: (_, view) => {
            const selection = getCellSelection(view);
            const isCol = selection.isColSelection();
            const isRow = selection.isRowSelection();
            if (isCol && isRow) {
                return deleteTable;
            }

            if (isCol) {
                return deleteColumn;
            }

            return deleteRow;
        },
        disable: (view) => {
            const selection = getCellSelection(view);
            if (selection.isRowSelection()) {
                if (selection.isColSelection()) {
                    return false;
                }
                return isFirstRowSelected(selection);
            }
            return false;
        },
    },
});
