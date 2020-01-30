import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'components';
import useDebounce from 'hooks/useDebounce';

const debouncingTime = Number(process.env.REACT_APP_VALIDATION_DEBOUNCING_TIME);

interface Props {
  type: string;
  name: string;
  label: string;
  onValidate: (field: string, value: string) => void;
  validate: (value: string) => boolean | Promise<boolean>;
  validationType?: 'blur' | 'change' | 'debounce'; 
  className?: string;
  isSuccessed?: boolean;
  value?: string;
  error?: string;
  autoFocus?: boolean;
  tooltip?: string;
}

const FormInput = (props: Props) => {
  const {
    name,
    validate,
    onValidate,
    validationType = 'blur',
    error: initError = '',
    value: initValue = '',
    ...rest
  } = props;

  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(initError);
  const debouncedValue = useDebounce(value, debouncingTime);

  const validatedValue = validationType === 'debounce' ? debouncedValue : value;

  useEffect(() => setError(initError), [initError]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleValidate = async () => {
    let newError = '';

    if (!validatedValue) {
      newError = t('errors.empty-field');
    } else if (! await validate(validatedValue)) {
      newError = t(`errors.${name}-incorrect`);
    }

    onValidate(name, newError);
    setError(newError);
  };

  useEffect(() => {
    if (!touched || validationType === 'blur') return;

    handleValidate();
    // eslint-disable-next-line
  }, [validatedValue]);

  const handleTouch = () => {
    if (!touched) setTouched(true);
  };

  return (
    <Input
      {...rest}
      name={name}
      value={value}
      onFocus={handleTouch}
      onChange={handleChange}
      onBlur={handleValidate}
      error={error}
    />
  );
};

export default React.memo(FormInput);
