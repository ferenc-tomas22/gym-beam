import { FCC } from '@/app/types';

import styles from './styles.module.css';

type ITextComponent = {
  typography: keyof typeof Typography;
  style?: React.CSSProperties;
  className?: string;
};

const Typography = {
  titleDisplay: 'titleDisplay',
  titleLarge: 'titleLarge',
  titleMedium: 'titleMedium',
  titleSmall: 'titleSmall',
  bodyLarge: 'bodyLarge',
  bodyRegular: 'bodyRegular',
  bodySmall: 'bodySmall',
  labelLarge: 'labelLarge',
  labelLarge400: 'labelLarge400',
  labelRegular: 'labelRegular',
  labelRegular400: 'labelRegular400',
  labelSmall: 'labelSmall',
  labelSmall400: 'labelSmall400',
};

export const Text: FCC<ITextComponent> = ({ typography, style, className, children }) => (
  <p
    style={style}
    className={className ? `${styles[typography]} ${className}` : styles[typography]}
  >
    {children}
  </p>
);
