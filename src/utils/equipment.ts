import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import { round } from 'mathjs';

const sum = (numbers: number[]) => {
  return numbers.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

const attributeNmaes = ['攻击力', '防御力', '生命值', '效果命中', '效果抗性', '暴击率', '暴击伤害', '速度'] as const;

type AttributeName = typeof attributeNmaes[number];

interface Attribute {
  name: AttributeName;
  value: number;
  type: 'percent' | 'value';
}

interface ValidAttribute {
  name: AttributeName;
  type: 'percent' | 'value';
  min: number;
  max: number;
  calc: (v: number) => number;
}

const validAttributes: ValidAttribute[] = [
  {
    name: '攻击力',
    type: 'percent',
    min: 4,
    max: 59,
    calc: (value) => {
      return value;
    },
  },
  {
    name: '防御力',
    type: 'percent',
    min: 4,
    max: 59,
    calc: (value) => {
      return value;
    },
  },
  {
    name: '生命值',
    type: 'percent',
    min: 4,
    max: 59,
    calc: (value) => {
      return value;
    },
  },
  {
    name: '效果命中',
    type: 'percent',
    min: 4,
    max: 59,
    calc: (value) => {
      return value;
    },
  },
  {
    name: '效果抗性',
    type: 'percent',
    min: 4,
    max: 59,
    calc: (value) => {
      return value;
    },
  },
  {
    name: '暴击率',
    type: 'percent',
    min: 3,
    max: 50,
    calc: (value) => {
      return value * 1.5;
    },
  },
  {
    name: '暴击伤害',
    type: 'percent',
    min: 3,
    max: 60,
    calc: (value) => {
      return value * 1.1;
    },
  },
  {
    name: '攻击力',
    type: 'value',
    min: 20,
    max: 400,
    calc: (value) => {
      return Number(((value / 1200) * 100).toFixed(1));
    },
  },
  {
    name: '防御力',
    type: 'value',
    min: 20,
    max: 300,
    calc: (value) => {
      return Number(((value / 550) * 100).toFixed(1));
    },
  },
  {
    name: '生命值',
    type: 'value',
    min: 30,
    max: 1500,
    calc: (value) => {
      return Number(((value / 5000) * 100).toFixed(1));
    },
  },
  {
    name: '速度',
    type: 'value',
    min: 2,
    max: 35,
    calc: (value) => {
      return value * 2;
    },
  },
];

const calcScore = (attribute: Attribute) => {
  return Number.parseFloat(
    (
      validAttributes.find((it) => it.name === attribute.name && it.type === attribute.type)?.calc(attribute.value) || 0
    ).toFixed(1)
  );
};

const validValue = (
  text: string,
  attributeName: string
):
  | {
      value: number;
      type: 'percent' | 'value';
    }
  | false => {
  if (/^(\d+)(%)$/.test(text)) {
    const value = Number(/^(\d+)(%)$/.exec(text)?.[1] || 0);
    const validAttribute = validAttributes.find(
      (item) => item.name === attributeName && item.type === 'percent'
    ) as ValidAttribute;
    if (value >= validAttribute?.min && value <= validAttribute?.max) {
      return {
        type: 'percent',
        value,
      };
    }
  }

  if (/^(\d+)$/.test(text)) {
    const value = Number(/^(\d+)$/.exec(text)?.[1] || 0);
    const validAttribute = validAttributes.find(
      (item) => item.name === attributeName && item.type === 'value'
    ) as ValidAttribute;
    if (value >= validAttribute?.min && value <= validAttribute?.max) {
      return {
        type: 'value',
        value,
      };
    }
  }

  return false;
};

export const getAttributes = (textDetections: GeneralAccurateOCRResponse['TextDetections']) => {
  const attributes: Attribute[] = [];
  const texts = textDetections.map((item) => item.DetectedText);
  texts.forEach((text, index) => {
    if (attributeNmaes.includes(text as unknown as AttributeName)) {
      const nextText = texts[index + 1];
      const values = validValue(nextText, text);

      if (nextText && values) {
        attributes.push({
          name: text as unknown as AttributeName,
          type: values.type,
          value: values.value,
        });
      }
    }
  });
  return attributes;
};

export const getRecoinAttributes = (textDetections: GeneralAccurateOCRResponse['TextDetections']) => {
  const attributes: Attribute[] = [];
  const texts = textDetections.map((item) => item.DetectedText);
  texts.forEach((text, index) => {
    if (attributeNmaes.includes(text as unknown as AttributeName)) {
      const nextText = texts[index + 2];
      const values = validValue(nextText, text);

      if (nextText && values) {
        attributes.push({
          name: text as unknown as AttributeName,
          type: values.type,
          value: values.value,
        });
      }
    }
  });
  return attributes;
};

export const transToText = (attributes: Attribute[]) => {
  const scores = attributes.map((item) => {
    return calcScore(item);
  });
  return `${scores.join('+')}=${round(sum(scores), 1)}`;
};

export const isRecoin = (data: GeneralAccurateOCRResponse['TextDetections']) => {
  return data.some((item) => {
    return item.DetectedText === '重铸材料';
  });
};
