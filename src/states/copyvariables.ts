import State from './state';
import Variable from '../variables/variable';
export default class CopyVariables extends State {
  constructor(name: string) {
    super('System.CopyVariables', name);
  }
  from(...variables: Variable[]): this {
    this.properties.from = variables;
    return this;
  }
  to(...variables: Variable[]): this {
    this.properties.to = variables;
    return this;
  }
}