/* Copyright 2021, Milkdown by Mirone. */
import { CmdKey, commandsCtx, Ctx, themeToolCtx } from '@sosuisen/milkdown-core';
import type { Icon } from '@sosuisen/milkdown-design-system';
import type { MarkType } from 'prosemirror-model';

import type { ButtonItem } from '../item';
import { hasMark, isTextAndNotHasMark } from './prosemirror';

export const createToggleIcon = <T>(
    ctx: Ctx,
    iconName: Icon,
    commandKey: CmdKey<T>,
    mark: MarkType,
    disableForMark: MarkType,
): ButtonItem => ({
    $: ctx.get(themeToolCtx).slots.icon(iconName),
    command: () => ctx.get(commandsCtx).call(commandKey),
    active: (view) => hasMark(view.state, mark),
    disable: (view) => isTextAndNotHasMark(view.state, disableForMark),
    enable: (view) => !!mark && !!view.state.schema.marks[mark.name],
});
