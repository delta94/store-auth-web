import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleInput } from 'components';

interface Props {
  type: string;
  name: string;
  label: string;
  onValidate: (field: string, value: string) => void;
  validate: (value: string) => boolean;
  className?: string;
  isSuccessed?: boolean;
  value?: string;
  error?: string;
  focus?: boolean;
  tooltip?: string;
}

const Input = (props: Props) => {
  const {
    name,
    validate,
    focus,
    onValidate,
    error: initError = '',
    value: initValue = '',
    ...rest
  } = props;

  const { t } = useTranslation();
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(initError);

  useEffect(() => setError(initError), [initError]);

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
    <SimpleInput
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleValidate}
      autoFocus={focus}
      error={error}
      {...rest}
    />
  );
};

export default React.memo(Input);
