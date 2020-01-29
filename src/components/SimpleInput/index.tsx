import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ErrorText, TinyText, Column } from 'styles/primitives';
import { Hint } from 'components';
import { TEXT_GREY, TEXT_ORANGE, BACKGROUND_GREY, SUCCESS_FIELD } from 'styles/colors';
import { SuccessIcon, EyeLineThroughIcon, EyeIcon } from 'assets/icons';

interface Props {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  className?: string;
  isSuccessed?: boolean;
  error?: string;
  autoFocus?: boolean;
  tooltip?: string;
}

const SimpleInput = (props: Props) => {
  const {
    className,
    onChange,
    onBlur,
    onFocus,
    name,
    value,
    label,
    tooltip,
    error,
    type: initType,
    isSuccessed = false,
    autoFocus = false,
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
        <Field 
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus={autoFocus}
          {...rest}
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

export default React.memo(SimpleInput);

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
    fill: ${TEXT_GREY};
  }
`;

const StyledEyeIcon = styled(EyeIcon)`
  cursor: pointer;

  path {
    fill: ${TEXT_GREY};
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
  color: ${TEXT_GREY};

  & >:first-child {
    margin-right: 2px;
  }
`;

const Field = styled.input`
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

const FieldWrapper = styled.div<{ error: boolean }>`
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid transparent;
  border-bottom-color: ${({ error }) => error ? TEXT_ORANGE : BACKGROUND_GREY};
  border-radius: 2px;
`;

const Error = styled.span<{ show: boolean }>`
  display: inline-flex;
  opacity: ${({ show }) => show ? 1 : 0};
  height: 16px;
  padding: 0 12px;
`;
