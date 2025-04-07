import React from 'react';
import clsx from 'clsx';
import { icon } from '../../icons';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconId: string;
}

const Icon: React.FC<IconProps> = ({ iconId, className, ...props }) => {
  return (
    <svg className={clsx(className)} role="img" {...props}>
      <use xlinkHref={`${icon}#${iconId}`} />
    </svg>
  );
};

export default Icon;
