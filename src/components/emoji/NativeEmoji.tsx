import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';
import { parseNativeEmoji } from '../../dataUtils/parseNativeEmoji';

import { emojiStyles } from './emojiStyles';

export function NativeEmoji({
  unified,
  sizeClassName,
  className,
}: {
  unified: string;
  sizeClassName?: string;
  className?: string;
}) {
  return (
    <span
      className={cx(
        styles.nativeEmoji,
        emojiStyles.common,
        emojiStyles.external,
        sizeClassName,
        className,
      )}
      data-unified={unified}
    >
      {parseNativeEmoji(unified)}
    </span>
  );
}

const styles = stylesheet.create({
  nativeEmoji: {
    '.': 'epr-emoji-native',
    fontFamily:
      '"Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji"!important',
    position: 'relative',
    lineHeight: '100%',
    fontSize: 'var(--epr-emoji-size)',
    textAlign: 'center',
    alignSelf: 'center',
    justifySelf: 'center',
    letterSpacing: '0',
    padding: 'var(--epr-emoji-padding)',
  },
});
