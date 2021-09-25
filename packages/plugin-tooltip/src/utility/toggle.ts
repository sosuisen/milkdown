/* Copyright 2021, Milkdown by Mirone. */
import { CmdKey, commandsCtx, Ctx, themeToolCtx } from '@sosuisen/milkdown-core';
import type { Icon } from '@sosuisen/milkdown-design-system';
import type { MarkType } from 'prosemirror-model';

import type { ButtonItem } from '../item';
import { hasMark, isTextAndNotHasMark } from './prosemirror';

const fontAwesomeIcon = (id: string) => {
    const span = document.createElement('span');
    let fontAwesome = '';
    switch (id) {
        case 'bold':
            fontAwesome = 'fa-bold';
            break;
        case 'italic':
            fontAwesome = 'fa-bold';
            break;
        case 'strikeThrough':
            fontAwesome = 'fa-strikethrough';
            break;
        case 'code':
            fontAwesome = 'fa-code';
            break;
        case 'link':
            fontAwesome = 'fa-link';
            break;
        default:
            break;
    }
    span.className = 'icon fas ' + fontAwesome;
    return span;
};

export const createToggleIcon = <T>(
    ctx: Ctx,
    iconName: Icon,
    commandKey: CmdKey<T>,
    mark: MarkType,
    disableForMark: MarkType,
): ButtonItem => ({
    // $: ctx.get(themeToolCtx).slots.icon(iconName),
    $: fontAwesomeIcon(iconName),
    command: () => ctx.get(commandsCtx).call(commandKey),
    active: (view) => hasMark(view.state, mark),
    disable: (view) => isTextAndNotHasMark(view.state, disableForMark),
    enable: (view) => !!mark && !!view.state.schema.marks[mark.name],
});
