import styled from 'styled-components';
import { BACKGROUND_GREY3, BLUE_HINT, TEXT_GREY } from 'styles/colors';
import { HintIcon } from 'assets/icons';

export const Title = styled.div`
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
  transition: visibility .3 ease-in-out;

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

export const Icon = styled(HintIcon)`
  width: 12px;
  height: 12px;
`;

export const Wrapper = styled.span`
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
