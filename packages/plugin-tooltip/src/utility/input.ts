/* Copyright 2021, Milkdown by Mirone. */
import { commandsCtx, Ctx } from '@sosuisen/milkdown-core';
import { ModifyImage, ModifyLink } from '@sosuisen/milkdown-preset-commonmark';
import { findChildren } from '@sosuisen/milkdown-utils';
import { Node as ProseNode } from 'prosemirror-model';

import { Event2Command, Updater } from '../item';
import { elementIsTag } from './element';

export const modifyLink =
    (ctx: Ctx): Event2Command =>
    (e) => {
        const { target } = e;
        if (!(target instanceof HTMLElement)) {
            return () => true;
        }
        if (elementIsTag(target, 'input')) {
            target.focus();
            return () => false;
        }
        const parent = target.parentNode;
        if (!parent) return () => false;

        const inputEl = Array.from(parent.children).find((el) => el.tagName === 'INPUT');
        if (!(inputEl instanceof HTMLInputElement)) return () => false;

        return ctx.get(commandsCtx).call(ModifyLink, inputEl.value);
    };

export const modifyImage =
    (ctx: Ctx): Event2Command =>
    (e) => {
        const { target } = e;
        if (!(target instanceof HTMLElement)) {
            return () => true;
        }
        if (elementIsTag(target, 'input')) {
            target.focus();
            return () => false;
        }
        const parent = target.parentNode;
        if (!parent) return () => false;

        const inputEl = Array.from(parent.children).find((el) => el.tagName === 'INPUT');
        if (!(inputEl instanceof HTMLInputElement)) return () => false;

        return ctx.get(commandsCtx).call(ModifyImage, inputEl.value);
    };

export const updateLinkView: Updater = (view, $) => {
    const { marks } = view.state.schema;
    const { firstChild, lastElementChild } = $;
    if (!(firstChild instanceof HTMLInputElement) || !(lastElementChild instanceof HTMLButtonElement)) return;

    const { selection } = view.state;
    let node: ProseNode | undefined;
    view.state.doc.nodesBetween(selection.from, selection.to, (n) => {
        if (marks.link.isInSet(n.marks)) {
            node = n;
            return false;
        }
        return;
    });
    if (!node) return;

    const mark = node.marks.find((m) => m.type === marks.link);
    if (!mark) return;

    const value = mark.attrs.href;
    firstChild.value = value;
    if (!value) {
        lastElementChild.classList.add('disable');
        return;
    }
    if (lastElementChild.classList.contains('disable')) {
        lastElementChild.classList.remove('disable');
    }
};

export const updateImageView: Updater = (view, $) => {
    const { nodes } = view.state.schema;
    const { firstChild, lastElementChild } = $;
    if (!(firstChild instanceof HTMLInputElement) || !(lastElementChild instanceof HTMLButtonElement)) return;

    const node = findChildren((node) => node.type === nodes.image)(view.state.selection.$from.node())[0]?.node;
    if (!node) return;

    const value = node.attrs.src;
    firstChild.value = value;
    if (!value) {
        lastElementChild.classList.add('disable');
        return;
    }
    if (lastElementChild.classList.contains('disable')) {
        lastElementChild.classList.remove('disable');
    }
};
