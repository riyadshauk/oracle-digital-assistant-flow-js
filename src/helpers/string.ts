/**
 * This is a hack to allow string literals to be treated as objects
 * (eg, can now reference the same String from different places)
 */
export default class String {
  str: string;
  constructor(str: string) {
    this.str = str;
  }
  replaceValue(newString: string) {
    this.str = newString;
  }
  getValue(): string {
    return this.str;
  }
}