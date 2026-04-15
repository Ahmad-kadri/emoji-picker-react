/// <reference types="react" />
import { EmojiStyle } from '../../types/exposedTypes';
import { GetEmojiUrl } from './BaseEmojiProps';
export declare function ExportedEmoji({ unified, size, emojiStyle, lazyLoad, getEmojiUrl, emojiUrl, nonce, }: {
    unified: string;
    emojiStyle?: EmojiStyle;
    size?: number;
    lazyLoad?: boolean;
    getEmojiUrl?: GetEmojiUrl;
    emojiUrl?: string;
    /** CSP nonce for the injected <style> tag that applies the size. */
    nonce?: string;
}): JSX.Element | null;
