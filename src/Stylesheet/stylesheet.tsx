import { Styles, createSheet } from 'flairup';
import * as React from 'react';

import { ClassNames } from '../DomUtils/classNames';

export const stylesheet = createSheet('epr', null);

const hidden = {
  display: 'none',
  opacity: '0',
  pointerEvents: 'none',
  visibility: 'hidden',
  overflow: 'hidden',
};

export const commonStyles = stylesheet.create({
  hidden: {
    '.': ClassNames.hidden,
    ...hidden,
  },
});

// Static CSS for skin tone button transforms.
// These are pre-computed from ITEM_SIZE=28 and 6 skin tone variations.
// Injected alongside flairup styles to avoid inline style= attributes (CSP compliance).
const SKIN_TONE_STATIC_CSS = `
.epr-skin-tones .epr-tone{transform:translateX(0)}
.epr-skin-tones.epr-vertical .epr-tone{transform:translateY(0)}
.epr-skin-tones.epr-open .epr-tone:nth-child(1){transform:translateX(0px)}
.epr-skin-tones.epr-open .epr-tone:nth-child(2){transform:translateX(-28px)}
.epr-skin-tones.epr-open .epr-tone:nth-child(3){transform:translateX(-56px)}
.epr-skin-tones.epr-open .epr-tone:nth-child(4){transform:translateX(-84px)}
.epr-skin-tones.epr-open .epr-tone:nth-child(5){transform:translateX(-112px)}
.epr-skin-tones.epr-open .epr-tone:nth-child(6){transform:translateX(-140px)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(1){transform:translateX(0px) scale(1.3)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(2){transform:translateX(-28px) scale(1.3)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(3){transform:translateX(-56px) scale(1.3)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(4){transform:translateX(-84px) scale(1.3)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(5){transform:translateX(-112px) scale(1.3)}
.epr-skin-tones.epr-open .epr-tone.epr-active:nth-child(6){transform:translateX(-140px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(1){transform:translateY(0px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(2){transform:translateY(-28px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(3){transform:translateY(-56px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(4){transform:translateY(-84px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(5){transform:translateY(-112px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone:nth-child(6){transform:translateY(-140px)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(1){transform:translateY(0px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(2){transform:translateY(-28px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(3){transform:translateY(-56px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(4){transform:translateY(-84px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(5){transform:translateY(-112px) scale(1.3)}
.epr-skin-tones.epr-open.epr-vertical .epr-tone.epr-active:nth-child(6){transform:translateY(-140px) scale(1.3)}
`;

export const PickerStyleTag = React.memo(function PickerStyleTag({
  nonce,
}: {
  nonce?: string;
}) {
  return (
    <style
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: stylesheet.getStyle() + SKIN_TONE_STATIC_CSS,
      }}
    />
  );
});

export const commonInteractionStyles = stylesheet.create({
  '.epr-main': {
    ':has(input:not(:placeholder-shown))': {
      categoryBtn: {
        ':hover': {
          opacity: '1',
          backgroundPositionY: 'var(--epr-category-navigation-button-size)',
        },
      },
      hiddenOnSearch: {
        '.': ClassNames.hiddenOnSearch,
        ...hidden,
      },
    },
    ':has(input:placeholder-shown)': {
      visibleOnSearchOnly: hidden,
    },
  },
  hiddenOnReactions: {
    transition: 'all 0.5s ease-in-out',
  },
  '.epr-reactions': {
    hiddenOnReactions: {
      height: '0px',
      width: '0px',
      opacity: '0',
      pointerEvents: 'none',
      overflow: 'hidden',
    },
  },
  '.EmojiPickerReact:not(.epr-search-active)': {
    categoryBtn: {
      ':hover': {
        opacity: '1',
        backgroundPositionY: 'var(--epr-category-navigation-button-size)',
      },
      '&.epr-active': {
        opacity: '1',
        backgroundPositionY: 'var(--epr-category-navigation-button-size)',
      },
    },
    visibleOnSearchOnly: {
      '.': 'epr-visible-on-search-only',
      ...hidden,
    },
  },
});

export function darkMode(key: string, value: Styles) {
  return {
    '.epr-dark-theme': {
      [key]: value,
    },
    '.epr-auto-theme': {
      [key]: {
        '@media (prefers-color-scheme: dark)': value,
      },
    },
  };
}
