import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TEXT_GREY, TEXT_ORANGE, BACKGROUND_GREY } from 'styles/colors';
import { EyeLineThroughIcon, EyeIcon } from 'assets/icons';
interface Props {
  type: string;
  name: string;
  label: string;
  onFieldValidChange: (field: string, value: boolean) => void;
  validate: (value: string) => boolean;
  className?: string;
  value?: string;
  focus?: boolean;
}

const Input = (props: Props) => {
  const {
    className,
    name,
    validate,
    label,
    focus,
    onFieldValidChange,
    type: initType,
    value: initValue = '',
    ...rest
  } = props;
  const { t } = useTranslation();
  const [type, setType] = useState(initType);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState('');

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
      newError = t('empty-field');
    } else if (!validate(value)) {
      newError = t(`${name}-incorrect`);
    }

    onFieldValidChange(name, !newError);
    setError(newError);
  };

  return (
    <Wrapper className={className}>
      <Label>{`${label}*`}</Label>
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
            {type === 'password' && <ShowPasswordIcon  />}
            {type === 'text' && <HidePasswordIcon />}
          </IconWrapper>
        )}
      </FieldWrapper>
      <Error show={!!error}>{error}</Error>
    </Wrapper>
  );
};

export default React.memo(Input);

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  display: flex;
  transform: translateY(-50%);
  z-index: 2;
`;

const ShowPasswordIcon = styled(EyeLineThroughIcon)`
  width: 16px;
  height: 14px;

  path {
    fill: ${TEXT_GREY};
  }
`;

const HidePasswordIcon = styled(EyeIcon)`
  width: 16px;
  height: 14px;

  path {
    fill: ${TEXT_GREY};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.label`
  padding: 0 12px;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${TEXT_GREY};
`;

const Field = styled.input`
  min-width: 100%;
  padding: 10px 44px 10px 12px;
  font-size: 15px;
  line-height: 22px;
  color: white;
  border: 0;
  background-color: ${BACKGROUND_GREY};

  &:-webkit-autofill, &:-webkit-autofill:focus, &:-webkit-autofill:hover {
    -webkit-box-shadow: inset 0 0 0 150px ${BACKGROUND_GREY};
    -webkit-text-fill-color: white;
    -webkit-transition-delay: 99999s;
  }
`;

const FieldWrapper = styled.div<{ error: boolean }>`
  border-bottom: 2px solid transparent;
  border-bottom-color: ${({ error }) => error ? TEXT_ORANGE : BACKGROUND_GREY};
  position: relative;
  border-radius: 2px;
  border-bottom-left-radius: ${({ error }) => error ? '0' : '2px'};
  border-bottom-right-radius: ${({ error }) => error ? '0' : '2px'};
  overflow: hidden;
`;

const Error = styled.span<{ show: boolean }>`
  opacity: ${({ show }) => show ? 1 : 0};
  height: 16px;
  padding: 0 12px;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: ${TEXT_ORANGE};
`;
