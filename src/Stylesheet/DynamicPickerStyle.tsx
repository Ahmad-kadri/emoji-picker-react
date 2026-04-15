import * as React from 'react';

import { usePickerConfig } from '../components/context/PickerConfigContext';

/**
 * Renders a nonce-tagged <style> element for dynamic CSS values
 * that cannot be expressed as static CSS classes (CSP-compliant).
 */
export function DynamicPickerStyle({ css }: { css: string }) {
  const { nonce } = usePickerConfig();
  return (
    <style
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
