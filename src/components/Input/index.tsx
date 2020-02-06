import React, { useState, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ErrorText, TinyText, Column } from 'styles/primitives';
import { Hint } from 'components';
import { GRAY_TEXT, ORANGE_500, GRAY_800, SUCCESS_FIELD, BLUE_500 } from 'styles/colors';
import { SuccessIcon, EyeLineThroughIcon, EyeIcon } from 'assets/icons';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends InputProps{
  label: string;
  className?: string;
  isSuccessed?: boolean;
  error?: string;
  tooltip?: string;
}

const Input = (props: Props) => {
  const {
    className,
    label,
    tooltip,
    error,
    type: initType,
    isSuccessed = false,
    ...rest
  } = props;

  const [type, setType] = useState(initType);

  const toggleType = () => {
    const newType = type === 'password' ? 'text' : 'password';
    setType(newType);
  };

  return (
    <Wrapper className={className}>
      <Label>
        <TinyText>
          {`${label}*`}
        </TinyText>
        {!!tooltip && (
          <Hint 
            title={tooltip}
            disabled={!!error}
          />
        )}
      </Label>
      <FieldWrapper error={!!error}>
        <input
          {...rest}
          type={type}
        />
        <IconWrapper onClick={toggleType}>
          {initType === 'password' && (
            <>
              {type === 'password' && <StyledEyeLineThroughIcon  />}
              {type === 'text' && <StyledEyeIcon />}
            </>
          )}
          {isSuccessed && <StyledSuccessIcon />}
        </IconWrapper>
      </FieldWrapper>
      <Error show={!!error}>
        <ErrorText>
          {error}
        </ErrorText>
      </Error>
    </Wrapper>
  );
};

export default React.memo(Input);

const IconWrapper = styled.div`
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

const StyledSuccessIcon = styled(SuccessIcon)`
  cursor: default;
  stroke: ${SUCCESS_FIELD};
  fill: none;
  
  path {
    fill: none;
  }
`;

const StyledEyeLineThroughIcon = styled(EyeLineThroughIcon)`
  cursor: pointer;

  path {
    fill: ${GRAY_TEXT};
  }
`;

const StyledEyeIcon = styled(EyeIcon)`
  cursor: pointer;

  path {
    fill: ${GRAY_TEXT};
  }
`;

const Wrapper = styled(Column)`
  justify-content: space-between;
`;

const Label = styled(TinyText)`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 2px;
  color: ${GRAY_TEXT};

  & >:first-child {
    margin-right: 2px;
  }
`;

const FieldWrapper = styled.div<{ error: boolean }>`
  position: relative;
  overflow: hidden;

  input {
    min-width: 100%;
    padding: 10px 44px 10px 12px;
    background-color: ${GRAY_800};
    color: white;
    font-size: 15px;
    line-height: 22px;
    border: 0;
    border-bottom: 2px solid transparent;
    border-bottom-color: ${({ error }) => error ? ORANGE_500 : GRAY_800};
    border-radius: 2px;
    outline: none;

    &:focus {
      border-bottom-color: ${({ error }) => error ? ORANGE_500 : BLUE_500};
    }

    /* Hack for styling autocompleted input in chrome  */
    &:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover {
      -webkit-box-shadow: inset 0 0 0 1000px ${GRAY_800};
      -webkit-text-fill-color: white;
      -webkit-transition-delay: 99999s;
    }
  }
`;

const Error = styled.span<{ show: boolean }>`
  display: inline-flex;
  opacity: ${({ show }) => show ? 1 : 0};
  height: 16px;
  padding: 0 12px;
`;
