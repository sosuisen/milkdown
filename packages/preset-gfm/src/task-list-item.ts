/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@sosuisen/milkdown-core';
import { createNode, createShortcut } from '@sosuisen/milkdown-utils';
import { wrapIn } from '@sosuisen/prosemirror-commands';
import {
    liftListItem,
    popListItem,
    sinkListItem,
    slideDownListItem,
    slideUpListItem,
    splitListItem,
} from '@sosuisen/prosemirror-schema-list';
import { wrappingInputRule } from 'prosemirror-inputrules';

import { SupportedKeys } from './supported-keys';

type Keys = Extract<
    keyof SupportedKeys,
    | 'SinkListItem'
    | 'LiftListItem'
    | 'NextListItem'
    | 'PopListItem'
    | 'SlideUpListItem'
    | 'SlideDownListItem'
    | 'TaskList'
>;

export const SplitTaskListItem = createCmdKey();
export const SinkTaskListItem = createCmdKey();
export const LiftTaskListItem = createCmdKey();
export const PopTaskListItem = createCmdKey();
export const SlideUpTaskListItem = createCmdKey();
export const SlideDownTaskListItem = createCmdKey();
export const TurnIntoTaskList = createCmdKey();

export const taskListItem = createNode<Keys>((options, utils) => {
    const id = 'task_list_item';
    const style = utils.getStyle(
        ({ palette, size }) =>
            css`
                list-style-type: none;
                position: relative;

                & > div {
                    overflow: hidden;
                    padding: 0 2px;
                }

                label {
                    position: absolute;
                    top: 0;
                    left: -2rem;
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin: 0.5rem 0;
                    input {
                        visibility: hidden;
                    }
                }
                label:before {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    border-radius: ${size.radius};
                }
                label:hover:before {
                    background: ${palette('background')};
                }
                &[data-checked='true'] {
                    label {
                        color: ${palette('primary')};
                    }
                }
                &[data-checked='false'] {
                    label {
                        color: ${palette('solid', 0.87)};
                    }
                }
                .paragraph {
                    margin: 0.5rem 0;
                }
            `,
    );

    return {
        id,
        schema: {
            group: 'listItem',
            // content: 'paragraph block*',
            content: 'block+',
            defining: true,
            attrs: {
                checked: {
                    default: false,
                },
                collapsed: {
                    default: false,
                },
            },
            parseDOM: [
                {
                    // tag: 'li[data-type="task-list-item"]',
                    tag: 'li[data-type="task-item"]',
                    priority: 60,
                    getAttrs: (dom) => {
                        if (!(dom instanceof HTMLElement)) {
                            throw new Error();
                        }
                        return {
                            checked: dom.dataset.checked === 'true',
                            collapsed: dom.dataset.collapsed === 'true',
                        };
                    },
                },
            ],
            toDOM: (node) => [
                'li',
                {
                    'data-type': 'task-item',
                    'data-checked': node.attrs.checked ? 'true' : 'false',
                    'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                    class: utils.getClassName(node.attrs, 'task-list-item', style),
                },
                0,
            ],
        },
        parser: {
            match: ({ type, checked }) => {
                return type === 'listItem' && checked !== null;
            },
            runner: (state, node, type) => {
                state.openNode(type, { checked: node.checked as boolean });
                state.next(node.children);
                state.closeNode();
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.openNode('listItem', undefined, { checked: node.attrs.checked });
                state.next(node.content);
                state.closeNode();
            },
        },
        inputRules: (nodeType) => [
            wrappingInputRule(/^\s*(\[([ |x])\])\s$/, nodeType, (match) => ({
                checked: match[match.length - 1] === 'x',
            })),
        ],
        commands: (nodeType) => [
            createCmd(SplitTaskListItem, () => splitListItem(nodeType)),
            createCmd(SinkTaskListItem, () => sinkListItem(nodeType)),
            createCmd(LiftTaskListItem, () => liftListItem(nodeType)),
            createCmd(PopTaskListItem, () => popListItem(nodeType)),
            createCmd(SlideUpTaskListItem, () => slideUpListItem(nodeType)),
            createCmd(SlideDownTaskListItem, () => slideDownListItem(nodeType)),
            createCmd(TurnIntoTaskList, () => wrapIn(nodeType)),
        ],
        shortcuts: {
            [SupportedKeys.NextListItem]: createShortcut(SplitTaskListItem, 'Enter'),
            [SupportedKeys.SinkListItem]: createShortcut(SinkTaskListItem, 'Mod-]'),
            [SupportedKeys.LiftListItem]: createShortcut(LiftTaskListItem, 'Mod-Shift-['),
            [SupportedKeys.PopListItem]: createShortcut(PopTaskListItem, 'Mod-['),
            [SupportedKeys.SlideUpListItem]: createShortcut(SlideUpTaskListItem, 'Alt-Shift-ArrowUp'),
            [SupportedKeys.SlideDownListItem]: createShortcut(SlideDownTaskListItem, 'Alt-Shift-ArrowDown'),
            [SupportedKeys.TaskList]: createShortcut(TurnIntoTaskList, 'Mod-Alt-9'),
        },
        view: (editor, nodeType, node, view, getPos, decorations) => {
            if (options?.view) {
                return options.view(editor, nodeType, node, view, getPos, decorations);
            }
            const fontAwesomeIcon = (id: string) => {
                let fontAwesome = '';
                switch (id) {
                    case 'checked':
                        fontAwesome = 'far fa-check-square';
                        break;
                    case 'unchecked':
                        fontAwesome = 'far fa-square';
                        break;
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
                const span = document.createElement('span');
                span.className = 'icon ' + fontAwesome;
                return span;
            };

            const listItem = document.createElement('li');

            /**
             * Collapsed
             */
            const collapseIconWrapper = document.createElement('label');
            collapseIconWrapper.setAttribute('class', 'collapse');
            collapseIconWrapper.contentEditable = 'false';
            let collapsedIcon = fontAwesomeIcon(node.attrs.collapsed ? 'collapsed' : 'expanded');
            collapseIconWrapper.appendChild(collapsedIcon);

            const setCollapsedIcon = (name: string) => {
                const nextIcon = fontAwesomeIcon(name);
                collapseIconWrapper.replaceChild(nextIcon, collapsedIcon);
                collapsedIcon = nextIcon;
            };

            const onCollapsedChange = (e: MouseEvent) => {
                let targetListItem: HTMLElement | undefined = undefined;
                let tmpNode = e.target as HTMLElement;
                if (!tmpNode) return;
                while (targetListItem === undefined) {
                    if (tmpNode.parentNode) {
                        tmpNode = tmpNode.parentNode as HTMLElement;
                        if (tmpNode.tagName.match(/li/i)) {
                            targetListItem = tmpNode;
                            break;
                        }
                    } else {
                        return;
                    }
                }

                const isCollapsed = targetListItem.dataset.collapsed === 'true' ? true : false;
                const isChecked = targetListItem.dataset.checked === 'true' ? true : false;

                const newCollapsed = !isCollapsed;
                const newNode = view.state.doc.nodeAt(getPos());
                let isChanged = false;
                newNode === null || newNode === void 0
                    ? void 0
                    : newNode.forEach((child, offset) => {
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
                            checked: isChecked,
                        }),
                    );
                    view.updateState(newState);
                }
                e.preventDefault();
            };
            collapseIconWrapper.addEventListener('mousedown', onCollapsedChange);

            listItem.dataset.collapsed = node.attrs.collapsed;

            let hasChild = false;
            for (let i = 0; i < node.childCount; i++) {
                if (node.child(i).type.name === 'bullet_list' || node.child(i).type.name === 'ordered_list') {
                    hasChild = true;
                    break;
                }
            }
            if (!hasChild) {
                setCollapsedIcon('none');
            }

            /**
             * checked
             */
            const checkboxWrapper = document.createElement('label');
            checkboxWrapper.setAttribute('class', 'check');
            const checkboxStyler = document.createElement('span');
            const content = document.createElement('div');
            let icon = fontAwesomeIcon('unchecked');
            checkboxWrapper.appendChild(icon);

            const setIcon = (name: string) => {
                const nextIcon = fontAwesomeIcon(name);
                checkboxWrapper.replaceChild(nextIcon, icon);
                icon = nextIcon;
            };
            checkboxWrapper.contentEditable = 'false';

            checkboxWrapper.addEventListener('mousedown', (e) => {
                if (!view.editable) {
                    return;
                }

                let targetListItem = undefined;
                let tmpNode = e.target as HTMLElement;
                if (!tmpNode) return;
                while (targetListItem === undefined) {
                    if (tmpNode.parentNode) {
                        tmpNode = tmpNode.parentNode as HTMLElement;
                        if (tmpNode.tagName.match(/li/i)) {
                            targetListItem = tmpNode;
                            break;
                        }
                    } else {
                        return;
                    }
                }
                const isCollapsed = targetListItem.dataset.collapsed === 'true' ? true : false;
                const isChecked = targetListItem.dataset.checked === 'true' ? true : false;

                const { tr } = view.state;
                view.dispatch(
                    tr.setNodeMarkup(getPos(), undefined, {
                        collapsed: isCollapsed,
                        checked: !isChecked,
                    }),
                );

                e.preventDefault();
            });
            listItem.dataset.checked = node.attrs.checked;
            checkboxWrapper.append(checkboxStyler);

            listItem.append(collapseIconWrapper, checkboxWrapper, content);

            const attributes = {
                'data-type': 'task-item',
                'data-checked': node.attrs.checked ? 'true' : 'false',
                'data-collapsed': node.attrs.collapsed ? 'true' : 'false',
                class: utils.getClassName(node.attrs, 'task-list-item', style),
            };
            Object.entries(attributes).forEach(([key, value]) => {
                listItem.setAttribute(key, value);
            });
            setIcon(node.attrs.checked ? 'checked' : 'unchecked');

            return {
                dom: listItem,
                contentDOM: content,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== id) return false;

                    if (listItem.dataset.collapsed !== updatedNode.attrs.collapsed) {
                        listItem.dataset.collapsed = updatedNode.attrs.collapsed;
                        setCollapsedIcon(updatedNode.attrs.collapsed ? 'collapsed' : 'expanded');
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
                        setCollapsedIcon('none');
                    }

                    listItem.dataset.checked = updatedNode.attrs.checked;
                    setIcon(updatedNode.attrs.checked ? 'checked' : 'unchecked');

                    return true;
                },
                destroy: () => {
                    collapseIconWrapper.removeEventListener('mousedown', onCollapsedChange);
                },
            };
        },
    };
});
