import { State, Intent, ConditionExists, Output, SystemList, SystemText, SetVariable, ConditionExpression, CopyVariables, Variable, TypedVariable, UntypedVariable, UntypedUserVariable, Entity, CustomComponent, FreeMarker } from '../lib';
import StringifiedState from './stringifiedstate';
import String from '../helpers/string';
import { dump } from 'js-yaml';
export default class DigitalAssistant {
  static primitiveTypes = {
    int: 'int',
    string: 'string',
    boolean: 'boolean',
    double: 'double',
    float: 'float',
  };
  platformVersion: string;
  main: boolean;
  name: string;
  context: { variables: { [key: string]: string }, };
  states: State[];
  arbitraryRootProperties: {[key: string]: string|number|boolean|Object}[];
  constructor(config: { platformVersion: string, main: boolean, name: string }) {
    this.platformVersion = config.platformVersion;
    this.main = config.main;
    this.name = config.name;
    this.context = { variables: {} };
    this.states = [];
    this.arbitraryRootProperties = [];
  }
  setContext(...variables: TypedVariable[]): this {
    variables.forEach(variable => this.context.variables[variable.getDisplayName()] = variable.type);
    return this;
  }
  /**
   * addState also explicitly adds states[idx].transitions.next = states[idx+1].{name || id} 
   * iff there are no transitions specified.
   * @param states 
   */
  addState(...states: State[]): this {
    states.forEach((state, idx) => {
      if (!state.transitions.hasOwnProperty('actions') || !state.transitions.hasOwnProperty('return') && idx < states.length - 1) {
        state.transitions.next = states[idx + 1].getDisplayName();
      }
      this.states.push(state);
    });
    return this;
  }
  addArbitraryRootProperty(...properties: {[key: string]: string|number|boolean|Object}[]): this {
    Object.entries(properties).forEach(entry => this.arbitraryRootProperties[(entry[0] as any)] = entry[1]);
    return this;
  }
  getVariables(): any {
    return this.context.variables;
  }
  json(): any {
    const finalJSON: any = {};
    finalJSON.metadata = this.platformVersion;
    finalJSON.main = this.main;
    finalJSON.name = this.name;
    finalJSON.context = this.context;
    this.arbitraryRootProperties.forEach(property => Object.assign(finalJSON, property));
    finalJSON.states = {};
    this.states.forEach((state: State) => finalJSON.states[state.getDisplayName()] = new StringifiedState(state).json());
    return finalJSON;
  };
  /**
   * @description This method shall convert this entire Digital Assistant Flow to YAML.
   * @returns {string} Digital Assistant Flow formatted in YAML
   */
  yaml(): string {
    return dump(this.json());
  }
}