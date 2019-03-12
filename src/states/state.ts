import Intent from './intent';
import Variable from '../variables/variable';
import String from '../helpers/string';
export default abstract class State {
  private static count = 1;
  componentType: string;
  id: string;
  properties: {
    variable?: Variable,
    source?: string,
    value?: string | boolean | string[] | number, // @see page 9+10 for array example: https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf
    from?: Variable[],      // use .toString() for YAML
    to?: Variable[],        // use .toString() for YAML
    options?: string[],     // use .toString() for YAML
    prompt?: string,
    text?: string,
    [key: string]: Variable|string|number|boolean|string[]|Variable[],
  };
  transitions: {
    next?: string,
    actions?: {
      [key: string]: string,
    },
    return?: string,
  };
  name: String;
  constructor(componentType: string, name: string) {
    this.componentType = componentType;
    this.name = new String(name);
    this.id = this.generateUID();
    this.properties = {};
    this.transitions = {};
  }
  // @todo flatten variable to  variable.id when generating yaml
  setVariable(variable: Variable): this {
    this.properties.variable = variable;
    return this;
  }
  // @todo flatten action to action.id when generating yaml
  addAction(intent: Intent, action: State): this {
    // @todo when mapping names to States or Variables, will need to loop through all ids associated with each State and retrieve the name
    if (!this.transitions.hasOwnProperty('actions')) {
      this.transitions.actions = {};
    }
    this.transitions.actions[intent.getDisplayName()] = action.getDisplayName();
    return this;
  }
  private generateUID(): string {
    return `State${State.count++}`;
  }
  changeName(name: string): this {
    this.name.replaceValue(name);
    return this;
  }
  getDisplayName(): string {
    return this.name.getValue();
  }
  exitFlow(): this {
    if (!this.transitions.hasOwnProperty('actions')) {
      this.transitions.actions = {};
    }
    this.transitions.actions['return'] = this.getDisplayName();
    return this;
  }
}