import { cx } from 'flairup';
import * as React from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';

type Props = Readonly<{
  className?: string;
}>;

export default function Space({ className }: Props) {
  return <div className={cx(styles.space, className)} />;
}

const styles = stylesheet.create({
  space: {
    flex: '1',
  },
});
