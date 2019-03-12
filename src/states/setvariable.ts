import State from './state';
import Variable from '../variables/variable';
export default class SetVariable extends State {
  constructor(name: string) {
    super('System.SetVariable', name);
  }
  setVariable(variable: Variable, value?: string | boolean | number): this {
    this.properties.variable = variable;
    this.properties.value = value;
    return this;
  }
  setValue(value: string | boolean | number): this {
    this.properties.value = value;
    return this;
  }
}