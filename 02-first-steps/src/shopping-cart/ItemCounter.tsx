import { useState, type CSSProperties } from 'react';

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
  const [count, setCount] = useState(quantity);

  const handleAdd = () => setCount(count + 1);

  const handleSubtract = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  return (
    <section style={sectionStyle}>
      <span style={{ width: 150 }}>{name}</span>

      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
    </section>
  );
};
