/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/milkdown-core';
import { createNode, createShortcut } from '@sosuisen/milkdown-utils';
import { wrappingInputRule } from 'prosemirror-inputrules';
import { liftListItem, popListItem, sinkListItem, splitListItem } from 'prosemirror-schema-list';

import { SupportedKeys } from '../supported-keys';

type Keys =
    | SupportedKeys['SinkListItem']
    | SupportedKeys['LiftListItem']
    | SupportedKeys['PopListItem']
    | SupportedKeys['NextListItem'];

const id = 'list_item';

export const SplitListItem = createCmdKey();
export const SinkListItem = createCmdKey();
export const LiftListItem = createCmdKey();
export const PopListItem = createCmdKey();

export const listItem = createNode<Keys>((options, utils) => {
    const style = utils.getStyle(
        (themeTool) => css`
            &,
            & > * {
                margin: 0.5rem 0;
            }

            &,
            li {
                &::marker {
                    color: ${themeTool.palette('primary')};
                }
            }
        `,
    );
    return {
        id,
        schema: {
            group: 'listItem',
            //            content: 'paragraph block*',
            content: 'block+',
            defining: true,
            attrs: {
                collapsed: {
                    default: false,
                },
            },
            parseDOM: [
                {
                    tag: 'li',
                    getAttrs: (dom) => {
                        if (!(dom instanceof HTMLElement)) {
                            throw new Error();
                        }
                        return { collapsed: dom.dataset.collapsed === 'true' };
                    },
                },
            ],
            toDOM: (node) => [
                'li',
                {
                    'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                    class: utils.getClassName(node.attrs, 'list-item', style),
                },
                0,
            ],
        },
        parser: {
            match: ({ type, checked }) => type === 'listItem' && checked === null,
            runner: (state, node, type) => {
                state.openNode(type);
                state.next(node.children);
                state.closeNode();
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.openNode('listItem');
                state.next(node.content);
                state.closeNode();
            },
        },
        inputRules: (nodeType) => [wrappingInputRule(/^\s*([-+*])\s$/, nodeType)],
        commands: (nodeType) => [
            createCmd(SplitListItem, () => splitListItem(nodeType)),
            createCmd(SinkListItem, () => sinkListItem(nodeType)),
            createCmd(LiftListItem, () => liftListItem(nodeType)),
            createCmd(PopListItem, () => popListItem(nodeType)),
        ],
        shortcuts: {
            [SupportedKeys.NextListItem]: createShortcut(SplitListItem, 'Enter'),
            [SupportedKeys.SinkListItem]: createShortcut(SinkListItem, 'Mod-]'),
            [SupportedKeys.LiftListItem]: createShortcut(LiftListItem, 'Mod-Shift-['),
            [SupportedKeys.PopListItem]: createShortcut(PopListItem, 'Mod-['),
        },
        view: (editor, nodeType, node, view, getPos, decorations) => {
            if (options?.view) {
                return options.view(editor, nodeType, node, view, getPos, decorations);
            }
            const fontAwesomeIcon = (id: string) => {
                const span = document.createElement('span');
                let fontAwesome = '';
                switch (id) {
                    case 'collapsed':
                        fontAwesome = 'fas fa-caret-right';
                        break;
                    case 'expanded':
                        fontAwesome = 'fas fa-caret-down';
                        break;
                    case 'none':
                        fontAwesome = '';
                        break;
                    default:
                        break;
                }
                span.className = 'icon ' + fontAwesome;
                return span;
            };
            const listItem = document.createElement('li');
            const collapseIconWrapper = document.createElement('label');
            const content = document.createElement('div');

            collapseIconWrapper.contentEditable = 'false';

            let icon = fontAwesomeIcon(node.attrs.collapsed ? 'collapsed' : 'expanded');
            collapseIconWrapper.appendChild(icon);

            const setIcon = (name: string) => {
                const nextIcon = fontAwesomeIcon(name);
                collapseIconWrapper.replaceChild(nextIcon, icon);
                icon = nextIcon;
            };

            const onChange = (e: MouseEvent) => {
                let isCollapsed = false;
                let target: Element;
                if ((e.target as HTMLLabelElement).children.length > 0) {
                    target = (e.target as HTMLLabelElement).children[0];
                } else {
                    target = e.target as unknown as Element;
                }
                if (target?.className === fontAwesomeIcon('collapsed').className) {
                    isCollapsed = true;
                } else if (target?.className === fontAwesomeIcon('expanded').className) {
                    isCollapsed = false;
                } else {
                    return;
                }

                const newCollapsed = !isCollapsed;

                const newNode = view.state.doc.nodeAt(getPos());

                let isChanged = false;
                newNode?.forEach((child, offset) => {
                    if (child.type.name === 'bullet_list' || child.type.name === 'ordered_list') {
                        const newState = view.state.apply(
                            view.state.tr.setNodeMarkup(getPos() + offset + 1, undefined, {
                                collapsed: newCollapsed,
                            }),
                        );
                        view.updateState(newState);
                        isChanged = true;
                    }
                });

                if (isChanged) {
                    const newState = view.state.apply(
                        view.state.tr.setNodeMarkup(getPos(), undefined, {
                            collapsed: newCollapsed,
                        }),
                    );
                    view.updateState(newState);
                }

                e.preventDefault();
            };

            collapseIconWrapper.addEventListener('mousedown', onChange);

            listItem.dataset.collapsed = node.attrs.collapsed;

            listItem.append(collapseIconWrapper, content);

            let hasChild = false;
            for (let i = 0; i < node.childCount; i++) {
                if (node.child(i).type.name === 'bullet_list' || node.child(i).type.name === 'ordered_list') {
                    hasChild = true;
                    break;
                }
            }

            if (!hasChild) {
                setIcon('none');
            }

            const attributes = {
                'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                class: utils.getClassName(node.attrs, 'list-item', style),
            };
            Object.entries(attributes).forEach(([key, value]) => {
                listItem.setAttribute(key, value);
            });

            return {
                dom: listItem,
                contentDOM: content,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== id) return false;

                    if (listItem.dataset.collapsed !== updatedNode.attrs.collapsed) {
                        listItem.dataset.collapsed = updatedNode.attrs.collapsed;
                        setIcon(updatedNode.attrs.collapsed ? 'collapsed' : 'expanded');
                    }

                    let hasChild = false;
                    for (let i = 0; i < updatedNode.childCount; i++) {
                        if (
                            updatedNode.child(i).type.name === 'bullet_list' ||
                            updatedNode.child(i).type.name === 'ordered_list'
                        ) {
                            hasChild = true;
                            break;
                        }
                    }
                    if (!hasChild) {
                        setIcon('none');
                    }

                    return true;
                },
                destroy: () => {
                    collapseIconWrapper.removeEventListener('mousedown', onChange);
                },
            };
        },
    };
});
