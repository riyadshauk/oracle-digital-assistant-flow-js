import State from './state';
import Intent from './intent';
export default class ConditionExists extends State {
  private static existsIntent = new Intent('exists');
  private static notExistsIntent = new Intent('notexists');
  constructor(name: string) {
    super('System.ConditionExists', name);
  }
  ifExists(action: State): this {
    this.addAction(ConditionExists.existsIntent, action);
    return this;
  }
  ifNotExists(action: State): this {
    this.addAction(ConditionExists.notExistsIntent, action);
    return this;
  }
}