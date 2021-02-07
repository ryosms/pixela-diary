class Color {
  constructor(public readonly name: string,
              public readonly colorName: string,
              public readonly colorCodes: string[]) {
  }
}

const colors = {
  shibafu: new Color('shibafu', 'green', []),
  momiji: new Color('momiji', 'red', []),
  sora: new Color('sora', 'blue', []),
  ichou: new Color('ichou', 'yellow', []),
  ajisai: new Color('ajisai', 'purple', []),
  kuro: new Color('kuro', 'black', []),
};

export {colors};
