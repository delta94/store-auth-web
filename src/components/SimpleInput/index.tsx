import React, { ChangeEvent, useState } from 'react';
import { ErrorText, TinyText } from 'styles/primitives';
import { Hint } from 'components';

import {
  Wrapper,
  FieldWrapper,
  IconWrapper,
  Label,
  Field,
  Error,
  StyledSuccessIcon,
  HiddenPassword,
  ShowedPassword,
} from './style';

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
              {type === 'password' && <HiddenPassword  />}
              {type === 'text' && <ShowedPassword />}
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
