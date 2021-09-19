/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { ThemeTool } from '@sosuisen/milkdown-core';

export const injectStyle = (themeTool: ThemeTool) => {
    const { palette, mixin, size } = themeTool;

    return css`
        ${mixin.border?.()};
        ${mixin.shadow?.()};

        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        background: ${palette('surface')};
        border-radius: ${size.radius};
        font-size: 1rem;

        height: 3.5rem;
        box-sizing: border-box;
        width: 20.5rem;
        padding: 0 1rem;
        gap: 1rem;

        input,
        button {
            all: unset;
        }

        input {
            flex-grow: 1;
            caret-color: ${palette('primary')};
            &::placeholder {
                color: ${palette('neutral', 0.6)};
            }
        }

        button {
            cursor: pointer;
            height: 2.25rem;
            color: ${palette('primary')};
            font-size: 0.875rem;
            padding: 0 0.5rem;
            font-weight: 500;
            letter-spacing: 1.25px;
            &:hover {
                background-color: ${palette('secondary', 0.12)};
            }
            &.disable {
                color: ${palette('neutral', 0.38)};
                cursor: not-allowed;
                &:hover {
                    background: transparent;
                }
            }
        }

        &.hide {
            display: none;
        }
    `;
};
