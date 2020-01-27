import styled from 'styled-components';
import { TEXT_GREY, TEXT_ORANGE, BACKGROUND_GREY, SUCCESS_FIELD } from 'styles/colors';
import { TinyText, Column } from 'styles/primitives';
import { SuccessIcon, EyeLineThroughIcon, EyeIcon } from 'assets/icons';

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  transform: translateY(-50%);
  z-index: 2;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledSuccessIcon = styled(SuccessIcon)`
  cursor: default;
  stroke: ${SUCCESS_FIELD};
  fill: none;
  
  path {
    fill: none;
  }
`;

export const HiddenPassword = styled(EyeLineThroughIcon)`
  cursor: pointer;

  path {
    fill: ${TEXT_GREY};
  }
`;

export const ShowedPassword = styled(EyeIcon)`
  cursor: pointer;

  path {
    fill: ${TEXT_GREY};
  }
`;

export const Wrapper = styled(Column)`
  justify-content: space-between;
`;

export const Label = styled(TinyText)`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 2px;
  color: ${TEXT_GREY};

  & >:first-child {
    margin-right: 2px;
  }
`;

export const Field = styled.input`
  min-width: 100%;
  padding: 10px 44px 10px 12px;
  background-color: ${BACKGROUND_GREY};
  color: white;
  font-size: 15px;
  line-height: 22px;
  border: 0;

  /* Hack for styling autocompleted input in chrome  */
  &:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover {
    -webkit-box-shadow: inset 0 0 0 1000px ${BACKGROUND_GREY};
    -webkit-text-fill-color: white;
    -webkit-transition-delay: 99999s;
  }
`;

export const FieldWrapper = styled.div<{ error: boolean }>`
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid transparent;
  border-bottom-color: ${({ error }) => error ? TEXT_ORANGE : BACKGROUND_GREY};
  border-radius: 2px;
`;

export const Error = styled.span<{ show: boolean }>`
  display: inline-flex;
  opacity: ${({ show }) => show ? 1 : 0};
  height: 16px;
  padding: 0 12px;
`;
