/* Copyright 2021, Milkdown by Mirone. */
export const SupportedKeys = {
    HardBreak: 'HardBreak',
    Blockquote: 'Blockquote',
    BulletList: 'BulletList',
    OrderedList: 'OrderedList',
    CodeFence: 'CodeFence',
    ExitCodeFence: 'ExitCodeFence',
    H1: 'H1',
    H2: 'H2',
    H3: 'H3',
    H4: 'H4',
    H5: 'H5',
    H6: 'H6',
    Text: 'Text',
    CodeInline: 'CodeInline',
    Em: 'Em',
    Bold: 'Bold',
    NextListItem: 'NextListItem',
    SinkListItem: 'SinkListItem',
    LiftListItem: 'LiftListItem',
    PopListItem: 'PopListItem',
    SlideUpListItem: 'SlideUpListItem',
    SlideDownListItem: 'SlideDownListItem',
} as const;

export type SupportedKeys = typeof SupportedKeys;
