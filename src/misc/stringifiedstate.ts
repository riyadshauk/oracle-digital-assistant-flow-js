import State from '../states/state';
import Variable from '../variables/variable';
import String, { hasOwnProperty } from '../helpers/string';
export default class StringifiedState {
  properties: {
    variable?: string,
    source?: string,
    value?: string | boolean | number, // @see page 9+10 for array example: https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf
    from?: string,
    to?: string,
    options?: string,
    prompt?: string,
    text?: string,
    [key: string]: string|boolean|number,
  };
  transitions: {
    next?: string,
    actions?: {
      [key: string]: string,
    },
    return?: string,
  };
  component: string;
  constructor(state: State) {
    this.properties = {};
    this.transitions = {};
    this.component = state.componentType;
    Object.keys(state.properties).forEach((property) => {
      const propertyValue: any = state.properties[property];
      if (propertyValue instanceof Variable) {
        this.properties[property] = (propertyValue as Variable).getDisplayName();
      } else if (Array.isArray(propertyValue) && (propertyValue as Variable[]).length > 0
        && (propertyValue as Variable[])[0] instanceof Variable) {
        this.properties[property] = (propertyValue as Variable[]).map((variable: Variable) => (
          variable.getDisplayName())).join(',');
      } else if (property === 'name') {
        this.properties.name = (propertyValue as String).getValue();
      } else {
        this.properties[property] = propertyValue.toString();
      }
    });
    if (hasOwnProperty(state.transitions, 'actions')) {
      Object.keys(state.transitions.actions).forEach((action: string) => {
        if (!hasOwnProperty(this.transitions, 'actions')) {
          this.transitions.actions = {};
        }
        this.transitions.actions[action] = state.transitions.actions[action];
      });
    }
    if (hasOwnProperty(state.transitions, 'return')) {
      this.transitions.return = state.transitions.return;
    }
  }
  json(): any {
    return {
      component: this.component,
      properties: this.properties,
      transitions: this.transitions,
    };
  }
}