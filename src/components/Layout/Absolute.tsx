import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function Absolute({ children, className }: Props) {
  return (
    <div className={cx(styles.absolute, className)}>{children}</div>
  );
}

const styles = stylesheet.create({
  absolute: {
    position: 'absolute',
  },
});
