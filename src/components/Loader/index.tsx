import React from 'react';
import { Wrapper } from './style';

interface Props {
  className?: string;
  size?: number;
  color?: string; 
}

const Loader = (props: Props) => {
  const { className, color = 'black', size = 10 } = props;
  const lineWidth = Math.ceil(size / 10);

  return (
    <Wrapper className={className} color={color} size={size} lineWidth={lineWidth} >
      <circle cx={size / 2} cy={size / 2} r={(size - lineWidth) / 2} />
    </Wrapper>
  );
};

export default React.memo(Loader);
