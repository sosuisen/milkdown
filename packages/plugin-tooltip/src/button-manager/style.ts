/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { ThemeTool } from '@sosuisen/milkdown-core';

export const injectStyle = (themeTool: ThemeTool) => {
    const { palette, mixin, size } = themeTool;
    return css`
        display: inline-flex;
        cursor: pointer;
        justify-content: space-evenly;
        position: absolute;
        border-radius: ${size.radius};

        ${mixin.border?.()};
        ${mixin.shadow?.()};

        overflow: hidden;
        background: ${palette('surface')};

        .icon {
            position: relative;
            color: ${palette('solid', 0.87)};

            width: 2rem;
            line-height: 2rem;
            text-align: center;
            transition: all 0.4s ease-in-out;
            border: 1px solid ${palette('surface', 0.87)};
            &:hover {
                background-color: ${palette('secondary', 0.12)};
            }
            &.active {
                color: #000030;
                background-color: #f0f0ff;
                border: 1px inset #f0f0ff;
            }
            &:not(:last-child)::after {
                content: '';
                position: absolute;
                top: 0;
                right: calc(-0.5 * ${size.lineWidth});
                width: ${size.lineWidth};
                bottom: 0;
                background: ${palette('line')};
            }
        }
        &.hide,
        .hide {
            display: none;
        }
    `;
};
