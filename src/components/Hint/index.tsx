import React from 'react';
import styled from 'styled-components';
import { TinyText } from 'styles/primitives';
import { GRAY_700, PURPLE_500, GRAY_TEXT } from 'styles/colors';
import { HintIcon } from 'assets/icons';

interface Props {
  className?: string;
  title: string;
  disabled?: boolean;
}

const Tooltip = (props: Props) => {
  const { className, title, disabled = false } = props;

  return (
    <Wrapper className={className} disabled={disabled}>
      <StyledHintIcon />
      <Title>
        <TinyText>{title}</TinyText>
      </Title>
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev.disabled === next.disabled;

export default React.memo(Tooltip, areEqual);

const Title = styled.div`
  visibility: hidden;
  width: 232px;
  background-color: ${GRAY_700};
  color: white;
  text-align: center;
  border-radius: 2px;
  padding: 12px;
  position: absolute;
  z-index: 1;
  bottom: 200%;
  left: 50%;
  transform: translateX(-50%);
  transition: visibility .3 ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -9px;
    border-width: 9px;
    border-style: solid;
    border-color: ${GRAY_700} transparent transparent transparent;
  }
`;

const StyledHintIcon = styled(HintIcon)`
  width: 12px;
  height: 12px;
`;

const Wrapper = styled.span<{ disabled: boolean }>`
  position: relative;
  display: inline-flex;

  ${StyledHintIcon} {
    path {
      fill: ${({ disabled }) => disabled ? GRAY_TEXT : PURPLE_500}
    }
  }

  &:hover ${Title} {
    visibility: visible;
  }

  &:hover ${StyledHintIcon}{
    path {
      fill: ${GRAY_TEXT}
    }
  }
`;
