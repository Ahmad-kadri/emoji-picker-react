import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';
import { emojiName, emojiUrlByUnified } from '../../dataUtils/emojiUtils';
import { isCustomEmoji } from '../../typeRefinements/typeRefinements';
import { EmojiStyle } from '../../types/exposedTypes';
import { useEmojisThatFailedToLoadState } from '../context/PickerContext';
import { usePickerDataContext } from '../context/PickerDataContext';

import { BaseEmojiProps } from './BaseEmojiProps';
import { EmojiImg } from './EmojiImg';
import { NativeEmoji } from './NativeEmoji';

// Pre-defined size classes for the sizes used internally.
// External callers that need a custom size should pass a nonce-tagged <style>
// and a matching className instead of relying on the size prop.
const SIZE_CLASS_CACHE = new Map<number, string>();

function getSizeClassName(size: number): string {
  if (SIZE_CLASS_CACHE.has(size)) {
    return SIZE_CLASS_CACHE.get(size)!;
  }
  const styles = stylesheet.create({
    [`emojiSize_${size}`]: {
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${size}px`,
    },
  });
  const className = cx(styles[`emojiSize_${size}`]);
  SIZE_CLASS_CACHE.set(size, className);
  return className;
}

export function ViewOnlyEmoji({
  emoji,
  unified,
  emojiStyle,
  size,
  lazyLoad,
  getEmojiUrl = emojiUrlByUnified,
  className,
}: BaseEmojiProps) {
  const [, setEmojisThatFailedToLoad] = useEmojisThatFailedToLoadState();
  const { emojiByUnified } = usePickerDataContext();

  // Size is applied via a generated CSS class rather than an inline style
  // so that no style="" attributes are ever written to the DOM (CSP compliance).
  const sizeClassName = size ? getSizeClassName(size) : undefined;

  const emojiToRender = emoji ? emoji : emojiByUnified(unified);

  if (!emojiToRender) {
    return null;
  }

  if (isCustomEmoji(emojiToRender)) {
    return (
      <EmojiImg
        sizeClassName={sizeClassName}
        emojiName={unified}
        emojiStyle={EmojiStyle.NATIVE}
        lazyLoad={lazyLoad}
        imgUrl={emojiToRender.imgUrl}
        onError={onError}
        className={className}
      />
    );
  }

  return (
    <>
      {emojiStyle === EmojiStyle.NATIVE ? (
        <NativeEmoji
          unified={unified}
          sizeClassName={sizeClassName}
          className={className}
        />
      ) : (
        <EmojiImg
          sizeClassName={sizeClassName}
          emojiName={emojiName(emojiToRender)}
          emojiStyle={emojiStyle}
          lazyLoad={lazyLoad}
          imgUrl={getEmojiUrl(unified, emojiStyle)}
          onError={onError}
          className={className}
        />
      )}
    </>
  );

  function onError() {
    setEmojisThatFailedToLoad((prev) => new Set(prev).add(unified));
  }
}
