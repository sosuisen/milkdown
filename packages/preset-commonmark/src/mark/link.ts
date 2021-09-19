/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/core';
import { createMark } from '@sosuisen/utils';
import { toggleMark } from 'prosemirror-commands';
import { InputRule } from 'prosemirror-inputrules';
import { Node as ProseNode } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

export const ToggleLink = createCmdKey<string>();
export const ModifyLink = createCmdKey<string>();
const id = 'link';
export const link = createMark((_, utils) => {
    const style = utils.getStyle((themeTool) => {
        const lineColor = themeTool.palette('line');

        return css`
            color: ${themeTool.palette('secondary')};
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            font-weight: 500;
            &:hover {
                background-color: ${lineColor};
                box-shadow: 0 0.2rem ${lineColor}, 0 -0.2rem ${lineColor};
            }
        `;
    });
    return {
        id,
        schema: {
            attrs: {
                href: {},
                title: { default: null },
            },
            inclusive: false,
            parseDOM: [
                {
                    tag: 'a[href]',
                    getAttrs: (dom) => {
                        if (!(dom instanceof HTMLElement)) {
                            throw new Error();
                        }
                        return { href: dom.getAttribute('href'), title: dom.getAttribute('title') };
                    },
                },
            ],
            toDOM: (mark) => ['a', { ...mark.attrs, class: utils.getClassName(mark.attrs, id, style) }],
        },
        parser: {
            match: (node) => node.type === 'link',
            runner: (state, node, markType) => {
                const url = node.url as string;
                const title = node.title as string;
                state.openMark(markType, { href: url, title });
                state.next(node.children);
                state.closeMark(markType);
            },
        },
        serializer: {
            match: (mark) => mark.type.name === id,
            runner: (state, mark) => {
                state.withMark(mark, 'link', undefined, {
                    title: mark.attrs.title,
                    url: mark.attrs.href,
                });
            },
        },
        commands: (markType) => [
            createCmd(ToggleLink, (href = '') => toggleMark(markType, { href })),
            createCmd(ModifyLink, (href = '') => (state, dispatch) => {
                if (!dispatch) return false;

                const { marks } = state.schema;

                let node: ProseNode | undefined;
                let pos = -1;
                const { selection } = state;
                state.doc.nodesBetween(selection.from, selection.to, (n, p) => {
                    if (marks.link.isInSet(n.marks)) {
                        node = n;
                        pos = p;
                        return false;
                    }
                    return;
                });
                if (!node) return false;

                const mark = node.marks.find(({ type }) => type === markType);
                if (!mark) return false;

                const start = pos;
                const end = pos + node.nodeSize;
                const { tr } = state;
                const linkMark = marks.link.create({ ...mark.attrs, href });
                dispatch(
                    tr
                        .removeMark(start, end, mark)
                        .addMark(start, end, linkMark)
                        .setSelection(new TextSelection(tr.selection.$anchor))
                        .scrollIntoView(),
                );

                return true;
            }),
        ],
        inputRules: (markType, schema) => [
            new InputRule(/\[(?<text>.*?)]\((?<href>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/, (state, match, start, end) => {
                const [okay, text = '', href, title] = match;
                const { tr } = state;
                if (okay) {
                    const content = text || 'link';
                    tr.replaceWith(start, end, schema.text(content)).addMark(
                        start,
                        content.length + start,
                        markType.create({ title, href }),
                    );
                }

                return tr;
            }),
        ],
    };
});
