export interface IKeyboardHandler {
  [key: string]: () => void;
}

export default class Keyboard {
  private pressedKeys: number[] = [];

  private addKey(key: string) {
    const code = key.charCodeAt(0);

    if (this.pressedKeys.indexOf(code) === -1) {
      this.pressedKeys.push(code);
    }
  }

  private removeKey(key: string) {
    this.pressedKeys = this.pressedKeys.filter((currentKey) => currentKey !== key.charCodeAt(0));
  }

  constructor() {
    window.addEventListener('keydown', (event) => {
      const { key } = event;
      this.addKey(key);
    });

    window.addEventListener('keyup', (event) => {
      const { key } = event;
      this.removeKey(key);
    });
  }

  getKey(key: string) {
    return !!this.pressedKeys.find((currentKey) => currentKey === key.charCodeAt(0));
  }

  handle(handler: IKeyboardHandler) {
    if (handler && this.pressedKeys.length > 0) {
      const keys = Object.keys(handler).filter((key) => this.getKey(key));

      if (keys.length <= 0) {
        return;
      }

      keys.forEach((key) => {
        if (this.getKey(key)) {
          const func = handler[key];
          func();
        }
      });
    }
  }
}
