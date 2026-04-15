import * as React from 'react';
export declare enum FlexDirection {
    ROW = "FlexRow",
    COLUMN = "FlexColumn"
}
declare type Props = Readonly<{
    children: React.ReactNode;
    className?: string;
    direction?: FlexDirection;
}>;
export default function Flex({ children, className, direction, }: Props): JSX.Element;
export {};
