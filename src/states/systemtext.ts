import State from './state';
export default class SystemText extends State {
  constructor(name: string) {
    super('System.Text', name);
  }
  setPrompt(prompt: string): this {
    this.properties.prompt = prompt;
    return this;
  }
}