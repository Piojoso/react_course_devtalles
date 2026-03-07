import React, { type CSSProperties } from 'react';

const sectionStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 10,
};

export const ItemCounter = () => {
  return (
    <section style={sectionStyle}>
      <span style={{ width: 150 }}>Headphones</span>
      <button>+1</button>
      <span>10</span>
      <button>-1</button>
    </section>
  );
};
