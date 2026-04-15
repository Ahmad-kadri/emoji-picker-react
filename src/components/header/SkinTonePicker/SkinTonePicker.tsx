/* eslint-disable complexity */
import { cx } from 'flairup';
import * as React from 'react';

import { ClassNames } from '../../../DomUtils/classNames';
import { stylesheet } from '../../../Stylesheet/stylesheet';
import {
  useOnSkinToneChangeConfig,
  useSkinTonesDisabledConfig,
} from '../../../config/useConfig';
import skinToneVariations from '../../../data/skinToneVariations';
import { useCloseAllOpenToggles } from '../../../hooks/useCloseAllOpenToggles';
import { useFocusSearchInput } from '../../../hooks/useFocus';
import Absolute from '../../Layout/Absolute';
import Relative from '../../Layout/Relative';
import { useSkinTonePickerRef } from '../../context/ElementRefContext';
import {
  useActiveSkinToneState,
  useSkinToneFanOpenState,
} from '../../context/PickerContext';

import { BtnSkinToneVariation } from './BtnSkinToneVariation';

// The size of each skin tone button (px). Must match SKIN_TONE_STATIC_CSS in stylesheet.tsx.
const ITEM_SIZE = 28;
// Total width when expanded (ITEM_SIZE * number of skin tones).
const EXPANDED_SIZE = ITEM_SIZE * skinToneVariations.length; // 168px

type Props = {
  direction?: SkinTonePickerDirection;
};

export function SkinTonePickerMenu() {
  return (
    <Relative className={cx(styles.menuRelative)}>
      <Absolute className={cx(styles.menuAbsolute)}>
        <SkinTonePicker direction={SkinTonePickerDirection.VERTICAL} />
      </Absolute>
    </Relative>
  );
}

export function SkinTonePicker({
  direction = SkinTonePickerDirection.HORIZONTAL,
}: Props) {
  const SkinTonePickerRef = useSkinTonePickerRef();
  const isDisabled = useSkinTonesDisabledConfig();
  const [isOpen, setIsOpen] = useSkinToneFanOpenState();
  const [activeSkinTone, setActiveSkinTone] = useActiveSkinToneState();
  const onSkinToneChange = useOnSkinToneChangeConfig();
  const closeAllOpenToggles = useCloseAllOpenToggles();
  const focusSearchInput = useFocusSearchInput();

  if (isDisabled) {
    return null;
  }

  const vertical = direction === SkinTonePickerDirection.VERTICAL;

  return (
    <Relative
      className={cx(
        styles.skinTones,
        vertical && styles.vertical,
        isOpen && styles.open,
        vertical && isOpen && styles.verticalShadow,
      )}
    >
      <div className={cx(styles.select)} ref={SkinTonePickerRef}>
        {skinToneVariations.map((skinToneVariation) => {
          const active = skinToneVariation === activeSkinTone;

          return (
            <BtnSkinToneVariation
              key={skinToneVariation}
              skinToneVariation={skinToneVariation}
              isOpen={isOpen}
              isActive={active}
              onClick={() => {
                if (isOpen) {
                  setActiveSkinTone(skinToneVariation);
                  onSkinToneChange(skinToneVariation);
                  focusSearchInput();
                } else {
                  setIsOpen(true);
                }
                closeAllOpenToggles();
              }}
            />
          );
        })}
      </div>
    </Relative>
  );
}

export enum SkinTonePickerDirection {
  VERTICAL = ClassNames.vertical,
  HORIZONTAL = ClassNames.horizontal,
}

const styles = stylesheet.create({
  skinTones: {
    '.': 'epr-skin-tones',
    '--': {
      '--epr-skin-tone-size': '15px',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    transition: 'all 0.3s ease-in-out',
    padding: '10px 0',
    // Default (horizontal, closed): collapsed to a single button width
    flexBasis: `${ITEM_SIZE}px`,
    // Open (horizontal): expand to full width
    '&.epr-open': {
      flexBasis: `${EXPANDED_SIZE}px`,
    },
    // Vertical closed: also constrain height
    '&.epr-vertical': {
      height: `${ITEM_SIZE}px`,
    },
    // Vertical open: expand both axes
    '&.epr-open.epr-vertical': {
      flexBasis: `${EXPANDED_SIZE}px`,
      height: `${EXPANDED_SIZE}px`,
    },
  },
  vertical: {
    '.': ClassNames.vertical,
    padding: '9px',
    alignItems: 'flex-end',
    flexDirection: 'column',
    borderRadius: '6px',
    border: '1px solid var(--epr-bg-color)',
  },
  verticalShadow: {
    boxShadow: '0px 0 7px var(--epr-picker-border-color)',
  },
  open: {
    '.': ClassNames.open,
    // @ts-ignore - backdropFilter is not recognized.
    backdropFilter: 'blur(5px)',
    background: 'var(--epr-skin-tone-picker-menu-color)',
    '.epr-active': {
      border: '1px solid var(--epr-active-skin-tone-indicator-border-color)',
    },
  },
  select: {
    '.': 'epr-skin-tone-select',
    position: 'relative',
    width: 'var(--epr-skin-tone-size)',
    height: 'var(--epr-skin-tone-size)',
  },
  // SkinTonePickerMenu layout: the Relative wrapper needs a fixed height,
  // and the Absolute wrapper is pinned to bottom-right.
  menuRelative: {
    height: `${ITEM_SIZE}px`,
  },
  menuAbsolute: {
    bottom: '0',
    right: '0',
  },
});
