import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function Relative({ children, className }: Props) {
  return (
    <div className={cx(styles.relative, className)}>{children}</div>
  );
}

const styles = stylesheet.create({
  relative: {
    position: 'relative',
  },
});
