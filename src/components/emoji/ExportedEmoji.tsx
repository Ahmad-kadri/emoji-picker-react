import * as React from 'react';

import { EmojiStyle } from '../../types/exposedTypes';

import { GetEmojiUrl } from './BaseEmojiProps';
import { ViewOnlyEmoji } from './ViewOnlyEmoji';

export function ExportedEmoji({
  unified,
  size = 32,
  emojiStyle = EmojiStyle.APPLE,
  lazyLoad = false,
  getEmojiUrl,
  emojiUrl,
  nonce,
}: {
  unified: string;
  emojiStyle?: EmojiStyle;
  size?: number;
  lazyLoad?: boolean;
  getEmojiUrl?: GetEmojiUrl;
  emojiUrl?: string;
  /** CSP nonce for the injected <style> tag that applies the size. */
  nonce?: string;
}) {
  const id = React.useId();
  const sizeClass = `epr-exported-${id.replace(/:/g, '')}`;

  if (!unified && !emojiUrl && !getEmojiUrl) {
    return null;
  }

  return (
    <>
      {size && (
        <style
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `.${sizeClass}{width:${size}px;height:${size}px;font-size:${size}px}`,
          }}
        />
      )}
      <ViewOnlyEmoji
        unified={unified}
        emojiStyle={emojiStyle}
        lazyLoad={lazyLoad}
        getEmojiUrl={emojiUrl ? () => emojiUrl : getEmojiUrl}
        className={size ? sizeClass : undefined}
      />
    </>
  );
}
