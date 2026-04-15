import { ReactNode, useEffect } from 'react';
import * as React from 'react';

import { cx } from 'flairup';
import { stylesheet } from '../Stylesheet/stylesheet';
import { useBodyRef } from '../components/context/ElementRefContext';
import { useActiveSkinToneState } from '../components/context/PickerContext';
import { ClickableEmoji } from '../components/emoji/Emoji';
import {
  useEmojiStyleConfig,
  useGetEmojiUrlConfig,
  useLazyLoadEmojisConfig,
  useSkinTonesDisabledConfig,
} from '../config/useConfig';
import { DataEmojis } from '../dataUtils/DataTypes';
import { emojiUnified } from '../dataUtils/emojiUtils';
import {
  getEmojiPositionStyle,
  shouldVirtualize,
} from '../virtualization/virtualizationHelpers';

import { preloadEmojiIfNeeded } from './preloadEmoji';
import { useCategoryHeight } from './useCategoryHeight';
import { useIsEmojiDisallowed } from './useDisallowedEmojis';
import { useIsEmojiHidden } from './useIsEmojiHidden';

export function useEmojiVirtualization({
  categoryEmojis,
  topOffset,
  onHeightReady,
  scrollTop,
  isCategoryVisible,
}: {
  categoryEmojis: DataEmojis;
  topOffset: number;
  onHeightReady: (height: number) => void;
  scrollTop: number;
  isCategoryVisible: boolean;
}) {
  const isEmojiHidden = useIsEmojiHidden();
  const lazyLoadEmojis = useLazyLoadEmojisConfig();
  const emojiStyle = useEmojiStyleConfig();
  const [activeSkinTone] = useActiveSkinToneState();
  const isEmojiDisallowed = useIsEmojiDisallowed();
  const getEmojiUrl = useGetEmojiUrlConfig();
  const showVariations = !useSkinTonesDisabledConfig();
  const BodyRef = useBodyRef();

  const emojisToPush = categoryEmojis.filter((emoji) => {
    const isDisallowed = isEmojiDisallowed(emoji);
    const { failedToLoad, filteredOut, hidden } = isEmojiHidden(emoji);

    return !failedToLoad && !filteredOut && !hidden && !isDisallowed;
  });

  const dimensions = useCategoryHeight(emojisToPush.length);

  useEffect(() => {
    if (dimensions) {
      onHeightReady(dimensions.categoryHeight);
    }
  }, [dimensions, onHeightReady, emojisToPush.length]);

  const isVirtualized = (style: { top: number; left: number } | undefined) =>
    dimensions &&
    BodyRef.current &&
    shouldVirtualize({
      scrollTop,
      clientHeight: BodyRef.current?.clientHeight ?? 0,
      topOffset,
      style,
      dimensions,
    });

  // Instead of absolutely positioning each emoji, we use CSS Grid auto-flow.
  // Off-screen (virtualized) emojis are replaced by empty spacer spans so the
  // grid retains the correct total height without any inline style= attribute.
  const emojis = emojisToPush.reduce((accumulator, emoji, index) => {
    const unified = emojiUnified(emoji, activeSkinTone);
    const style = getEmojiPositionStyle(dimensions, index);

    if (!isCategoryVisible) {
      // Category is outside the viewport entirely — render a lightweight
      // spacer so the grid row keeps its height and scroll math stays correct.
      accumulator.push(
        <span key={unified} className={cx(emojiSpacerClass)} aria-hidden="true" />,
      );
      return accumulator;
    }

    if (isVirtualized(style)) {
      preloadEmojiIfNeeded(
        emoji,
        emojiStyle,
        scrollTop,
        BodyRef.current?.clientHeight ?? 0,
        topOffset,
        style,
        dimensions,
        getEmojiUrl,
      );
      accumulator.push(
        <span key={unified} className={cx(emojiSpacerClass)} aria-hidden="true" />,
      );
      return accumulator;
    }

    accumulator.push(
      <ClickableEmoji
        showVariations={showVariations}
        key={unified}
        emoji={emoji}
        unified={unified}
        emojiStyle={emojiStyle}
        lazyLoad={lazyLoadEmojis}
        getEmojiUrl={getEmojiUrl}
      />,
    );
    return accumulator;
  }, [] as ReactNode[]);

  return {
    emojis,
    dimensions,
  };
}

// Empty grid cell that keeps the row height without using inline styles.
const emojiSpacerStyles = stylesheet.create({
  emojiSpacer: {
    display: 'block',
    width: 'var(--epr-emoji-fullsize)',
    height: 'var(--epr-emoji-fullsize)',
  },
});

const emojiSpacerClass = emojiSpacerStyles.emojiSpacer;
