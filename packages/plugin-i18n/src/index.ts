/* Copyright 2021, Milkdown by Mirone. */
import { createCtx, MilkdownPlugin } from '@sosuisen/milkdown-core';

export const i18nCtx = createCtx<Record<string, string>>({});

export const i18n: MilkdownPlugin = (pre) => {
    pre.inject(i18nCtx);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
};
