import State from './state';
export default class Intent extends State {
  constructor(name: string) {
    super('System.Intent', name);
  }
}