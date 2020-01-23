import React from 'react';
import styled from 'styled-components';
import { TinyText } from 'styles/primitives';
import { BACKGROUND_GREY3, BLUE_HINT, TEXT_GREY } from 'styles/colors';
import { HintIcon } from 'assets/icons';

interface Props {
  className?: string;
  title: string;
  disabled?: boolean;
}

const Tooltip = (props: Props) => {
  const { className, title, disabled = false } = props;

  return (
    <Wrapper className={className}>
      <Icon />
      {!disabled && (
        <Title>
          <TinyText>{title}</TinyText>
        </Title>
      )}
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev.disabled === next.disabled;

export default React.memo(Tooltip, areEqual);

const Title = styled.div`
  visibility: hidden;
  width: 232px;
  background-color: ${BACKGROUND_GREY3};
  color: white;
  text-align: center;
  border-radius: 2px;
  padding: 12px;
  position: absolute;
  z-index: 1;
  bottom: 200%;
  left: 50%;
  transform: translateX(-50%);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -9px;
    border-width: 9px;
    border-style: solid;
    border-color: ${BACKGROUND_GREY3} transparent transparent transparent;
  }
`;

const Icon = styled(HintIcon)`
  width: 12px;
  height: 12px;
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;

  ${Icon} {
    path {
      fill: ${BLUE_HINT}
    }
  }

  &:hover ${Title} {
    visibility: visible;
  }

  &:hover ${Icon}{
    path {
      fill: ${TEXT_GREY}
    }
  }
`;