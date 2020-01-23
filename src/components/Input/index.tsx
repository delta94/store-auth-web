import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeLineThroughIcon, EyeIcon } from 'assets/icons';
import { ErrorText, TinyText } from 'styles/primitives';
import { Hint } from 'components';

import { Wrapper, FieldWrapper, IconWrapper, Label, Field, Error } from './style';

interface Props {
  type: string;
  name: string;
  label: string;
  onValidate: (field: string, value: string) => void;
  validate: (value: string) => boolean;
  className?: string;
  value?: string;
  error?: string;
  focus?: boolean;
  tooltip?: string;
}

const Input = (props: Props) => {
  const {
    className,
    name,
    validate,
    label,
    focus,
    tooltip,
    onValidate,
    type: initType,
    error: initError = '',
    value: initValue = '',
    ...rest
  } = props;

  const { t } = useTranslation();
  const [type, setType] = useState(initType);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(initError);

  useEffect(() => setError(initError), [initError]);

  const toggleType = () => {
    const newType = type === 'password' ? 'text' : 'password';
    setType(newType);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleValidate = () => {
    let newError = '';

    if (!value) {
      newError = t('errors.empty-field');
    } else if (!validate(value)) {
      newError = t(`errors.${name}-incorrect`);
    }

    onValidate(name, newError);
    setError(newError);
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
          onChange={handleChange}
          type={type}
          onBlur={handleValidate}
          autoFocus={focus}
          {...rest}
        />
        {initType === 'password' && (
          <IconWrapper onClick={toggleType}>
            {type === 'password' && <EyeLineThroughIcon  />}
            {type === 'text' && <EyeIcon />}
          </IconWrapper>
        )}
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
