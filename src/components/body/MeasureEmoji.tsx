import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';
import { categoryFromCategoryConfig } from '../../config/categoryConfig';
import {
  useCategoriesConfig,
  useEmojiStyleConfig,
  useGetEmojiUrlConfig,
  useLazyLoadEmojisConfig,
} from '../../config/useConfig';
import {
  useGetEmojisByCategory,
  emojiUnified,
} from '../../dataUtils/emojiSelectors';
import {
  useActiveSkinToneState,
  useEmojiSizeState,
} from '../context/PickerContext';
import { ClickableEmoji } from '../emoji/Emoji';

export function MeasureEmoji() {
  const categories = useCategoriesConfig();
  const getEmojisByCategory = useGetEmojisByCategory();
  const emojiStyle = useEmojiStyleConfig();
  const getEmojiUrl = useGetEmojiUrlConfig();
  const lazyLoadEmojis = useLazyLoadEmojisConfig();
  const [activeSkinTone] = useActiveSkinToneState();
  const [emojiSize, setEmojiSize] = useEmojiSizeState();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setEmojiSize(ref.current.clientHeight);
    }
  });

  if (emojiSize) {
    return null;
  }

  const firstCategory = categories[0];
  const dummyEmoji = getEmojisByCategory(
    categoryFromCategoryConfig(firstCategory),
  )[0];
  const unified = dummyEmoji ? emojiUnified(dummyEmoji, activeSkinTone) : '';

  if (!dummyEmoji) {
    return null;
  }

  return (
    // Wrapper is invisible and out of flow so it doesn't affect layout.
    // The child emoji's rendered height is read to calibrate virtual scroll.
    <div ref={ref} className={cx(styles.measureWrapper)}>
      <ClickableEmoji
        emoji={dummyEmoji}
        unified={unified}
        emojiStyle={emojiStyle}
        getEmojiUrl={getEmojiUrl}
        lazyLoad={lazyLoadEmojis}
        showVariations={false}
        hidden={false}
      />
    </div>
  );
}

const styles = stylesheet.create({
  measureWrapper: {
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
  },
});
