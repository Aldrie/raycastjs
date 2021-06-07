interface IKeyboardHandler {
  [key: string]: () => void;
}

export default class Keyboard {
  private pressedKeys: string[] = [];

  private handler: IKeyboardHandler = null;

  private addKey(key: string) {
    this.pressedKeys.push(key);
  }

  private removeKey(key: string) {
    this.pressedKeys = this.pressedKeys.filter((currentKey) => currentKey !== key);
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
    return !!this.pressedKeys.find((currentKey) => currentKey === key);
  }

  setHandler(handler: IKeyboardHandler) {
    this.handler = handler;
  }

  throwHandler() {
    if (this.handler && this.pressedKeys.length > 0) {
      const { handler } = this;
      Object.keys(handler).forEach((key) => {
        if (this.getKey(key)) {
          const func = handler[key];
          func();
        }
      });
    }
  }
}
