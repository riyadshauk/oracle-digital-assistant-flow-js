import State from './state';
export default class Output extends State {
  constructor(text: string, name: string) {
    super('System.Output', name);
    this.properties.text = text;
  }
}