export class Machinehealth {
  constructor() {
  }

// @ts-ignore
  private _usedSize: number;

  get usedSize(): number {
    return this._usedSize;
  }

  set usedSize(value: number) {
    this._usedSize = value;
  }

  get freeSize(): number {
    return this._freeSize;
  }

  set freeSize(value: number) {
    this._freeSize = value;
  }

// @ts-ignore
  private _freeSize: number;
}

