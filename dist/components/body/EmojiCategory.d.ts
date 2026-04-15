import * as React from 'react';
import { CategoryConfig } from '../../types/exposedTypes';
declare type Props = Readonly<{
    categoryConfig: CategoryConfig;
    children?: React.ReactNode;
    hidden?: boolean;
    hiddenOnSearch?: boolean;
}>;
export declare function EmojiCategory({ categoryConfig, children, hidden, hiddenOnSearch, }: Props): JSX.Element;
export {};
