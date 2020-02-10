import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { GRAY_TEXT } from 'styles/colors';

interface Props {
  className?: string;
  children: ReactNode;
}

const Tabs = (props: Props) => {
  const [active, setActive] = useState(0);
  const { className, children } = props;

  const handleChangeTab = (index: number) => () => {
    setActive(index);
  };

  const tabWidth = 100 / React.Children.count(children);

  const labels = React.Children.map(children, (child: any, index) => {
    const label = child.props.label;
  
    return (
      <Label 
        key={label}
        active={active === index}
        onClick={handleChangeTab(index)}
        width={tabWidth}
      >
        {label}
      </Label>
    );
  });

  const content = React.Children.map(children, (child, index) => index === active ? child : null);

  return (
    <Wrapper className={className}>
      <TabLabels>
        {labels}
      </TabLabels>
      {content}
    </Wrapper>
  );
};

export default React.memo(Tabs);

const Wrapper = styled.div`
  width: 100%;
`;

const TabLabels = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
  background-color: transparent;
  list-style: none;
`;

const Label = styled.li<{ active: boolean; width: number }>`
  display: flex;
  justify-content: center;
  width: ${({ width }) => width}%;
  padding-bottom: 10px;
  border-bottom: ${({ active }) => active ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.1)'};
  color: ${({ active }) => active ? 'white' : GRAY_TEXT};
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 300ms ease-in-out;
  cursor: pointer;
`;
