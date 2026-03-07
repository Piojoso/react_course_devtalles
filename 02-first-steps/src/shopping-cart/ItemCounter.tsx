import React, { type CSSProperties } from 'react';

interface Props {
  name: string;
  quantity?: number;
}

const sectionStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 10,
};

export const ItemCounter = ({ name, quantity = 1 }: Props) => {
  return (
    <section style={sectionStyle}>
      <span style={{ width: 150 }}>{name}</span>
      <button>+1</button>
      <span>{quantity}</span>
      <button>-1</button>
    </section>
  );
};
