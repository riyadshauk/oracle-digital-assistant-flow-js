import State from './state';
export default class SystemList extends State {
  constructor(name: string) {
    super('System.List', name);
  }
  setOptions(...options: string[]): this {
    this.properties.options = options;
    return this;
  }
  setPrompt(prompt: string): this {
    this.properties.prompt = prompt;
    return this;
  }
}