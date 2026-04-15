/// <reference types="react" />
import { EmojiStyle } from '../../types/exposedTypes';
export declare function EmojiImg({ emojiName, sizeClassName, lazyLoad, imgUrl, onError, className, }: {
    emojiName: string;
    emojiStyle: EmojiStyle;
    sizeClassName?: string;
    lazyLoad?: boolean;
    imgUrl: string;
    onError: () => void;
    className?: string;
}): JSX.Element;
