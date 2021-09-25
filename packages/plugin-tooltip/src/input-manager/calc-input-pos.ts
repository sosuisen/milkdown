/* Copyright 2021, Milkdown by Mirone. */
import { calculateTextPosition } from '@sosuisen/milkdown-utils';
import type { EditorView } from 'prosemirror-view';

export const calcInputPos = (view: EditorView, input: HTMLDivElement) => {
    calculateTextPosition(view, input, (start, end, target, parent) => {
        const selectionWidth = end.left - start.left;
        let left = start.left - parent.left - (target.width - selectionWidth) / 2;
        let top = start.bottom - parent.top + 14;

        if (left < 0) left = 0;

        // Check tooltip buttons
        const hiddenTooltip = document.getElementsByClassName('tooltip hide');
        if (hiddenTooltip.length === 0) {
            // tooltip buttons are active
            top += target.height;
        }

        return [top, left];
    });
};
