import { useState } from 'react';

interface Weapon {
  meta: {
    type: string;
  }[];
}

const count = 10;

const countOfScore = {
  3: 1.5,
  5: 3,
  7: 4.5,
};

const types = [];

const Action = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  // 找符合类型最多的
  const getMaxScore = () => {};

  return <div>123</div>;
};

export default Action;
