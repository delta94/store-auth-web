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
    onBlur,
    onFocus,
    disabled,
    type: initType,
    isSuccessed = false,
    ...rest
  } = props;

  const [type, setType] = useState(initType);
  const [active, setActive] = useState(false);
  const inputId = `${label}Input`;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setActive(false);

    if (onBlur) onBlur(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setActive(true);

    if (onFocus) onFocus(event);
  };

  const toggleType = () => {
    const newType = type === 'password' ? 'text' : 'password';
    setType(newType);
  };

  return (
    <Wrapper className={className}>
      <Label htmlFor={inputId}>
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
      <FieldWrapper 
        error={!!error} 
        active={active}
        disabled={disabled}
      >
        <input
          {...rest}
          id={inputId}
          tabIndex={1}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
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

const getBorderColor = (error: boolean, active: boolean) => {
  if (error) return ORANGE_500;

  return active ? BLUE_500 : GRAY_800;
};

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

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 2px;
  color: ${GRAY_TEXT};
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;

  & >:first-child {
    margin-right: 2px;
  }
`;

const FieldWrapper = styled.div<{ error: boolean; active: boolean; disabled?: boolean }>`
  position: relative;
  overflow: hidden;
  border: 0;

  input {
    min-width: 100%;
    padding: 10px 44px 10px 12px;
    background-color: ${GRAY_800};
    color: white;
    font-size: 15px;
    line-height: 22px;
    outline: none;
    border: 0;
    border-bottom: 2px solid ${({ error, active }) => getBorderColor(error, active)};

    /* Hack for styling autocompleted input in chrome  */
    &:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover {
      -webkit-box-shadow: inset 0 0 0 1000px ${GRAY_800};
      -webkit-text-fill-color: ${({ disabled }) => disabled ? GRAY_TEXT : 'white'};
      -webkit-transition-delay: 99999s;
    }

    &:disabled {
      color: ${GRAY_TEXT};
    }
  }
`;

const Error = styled.span<{ show: boolean }>`
  display: inline-flex;
  opacity: ${({ show }) => show ? 1 : 0};
  height: 16px;
  padding: 0 12px;
`;
