/* Copyright 2021, Milkdown by Mirone. */
import { injectVar, pack2Tool, ThemePack, ThemeTool } from '@sosuisen/milkdown-design-system';

import { createCtx } from '../context';
import { MilkdownPlugin } from '../utility';

export const themeToolCtx = createCtx<ThemeTool>({
    mixin: {} as never,
    font: {} as never,
    size: {} as never,
    slots: {} as never,
    palette: () => '',
});

export { ThemeTool } from '@sosuisen/milkdown-design-system';

export const themeFactory =
    (themePack: ThemePack): MilkdownPlugin =>
    (pre) => {
        pre.inject(themeToolCtx);
        return (ctx) => {
            injectVar(themePack);
            const tool = pack2Tool(themePack);

            ctx.set(themeToolCtx, tool);
        };
    };
