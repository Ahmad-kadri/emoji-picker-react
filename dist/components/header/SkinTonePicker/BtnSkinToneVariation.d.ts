/// <reference types="react" />
import { SkinTones } from '../../../types/exposedTypes';
declare type Props = {
    isOpen: boolean;
    onClick: () => void;
    isActive: boolean;
    skinToneVariation: SkinTones;
};
export declare function BtnSkinToneVariation({ isOpen, onClick, isActive, skinToneVariation, }: Props): JSX.Element;
export {};
