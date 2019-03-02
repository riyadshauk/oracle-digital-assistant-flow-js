import * from lib.d.ts;
/**
 * NOTE: Every class here should have a json() method for returning a jsonified version of each class.
 * It is trivial to convert JSON to YAML (ie, use npm module called 'json2yaml').
 */

class SystemIntent {
  constructor(properties?: [], transitions?: []) {
    this.component = 'System.Intent';
    this.properties = properties || [];
    this.transitions = transitions || [];
  }
  /**
   *
   * @param {{}} property ex: { variable: 'iResult' } passed as a JSON
   */
  addProperty(property: { variable: string }) {
    this.properties.push(property);
  }
  /**
   * Note: An intent can be created in the Digital Assistant GUI.
   * @param {{}} action ex: { SomeIntent: "someState" } passed as a JSON
   */
  addTransition(action: Action) {
    this.transitions.push(action);
  }
}

class SystemList {
  /**
   * 
   * @param {{options?: [string]|string, prompt?: string, variable?: string}} [properties] 
   * @param {} [transitions] 
   */
  constructor(properties?: [], transitions?: Transitions) {
    this.component = 'System.List';
    this.properties = properties || [];
    this.transitions = transitions || [];
  }
  /**
   * 
   * @param {[string]|string} options ex: ['large', 'medium', 'small'] or 'large,medium,small' (both are acceptable formats)
   */
  setOptions(options: [string]|string) {
    this.properties.options = options;
  }
  /**
   * 
   * @param {string} prompt 
   */
  setPrompt(prompt: string) {
    this.properties.prompt = prompt;
  }
  setVariable(variableName: string) {
    this.properties.variable = variableName;
  }
  setTransitions(transitions?: {}|{ actions: {}}) {
    this.transitions = transitions || {};
  }
  json() {
    return {
      component: this.component,
      properties: {
        options: this.properties.options.tostring(),
        prompt: this.properties.prompt,
        variable: this.properties.variable,
      }
    };
  }
}

class SystemOutput {
  /**
   * 
   * @param {string} text 
   * @param {{}} transitions 
   */
  constructor(text, transitions) {
    this.component = 'System.Output';
    this.properties = { text };
    this.transitions = transitions;
  }
}

class Context {
  constructor() {
    this.variables = [];
  }
  /**
   * 
   * @param {[TypedVariable]} variables
   */
  addVariables(variables) {
    this.variables.push(...variables);
  }
  json() {
    return { ...this.variables };
  }
}

// value: "${iResult.value.entityMatches['PizzaSize'][0]}"
class Value {
  constructor() {

  }
  entityMatches(entityName) {
    
  }
}

class Variable {
  constructor(variableName) {
    this.variableName = variableName;
  }
}

class UntypedVariable extends Variable {
  /**
   * NOTE: These kinds of variables are not declared in the bot's Context
   * @param {string} variableName 
   */
  constructor(variableName) {
    super(variableName);
  }
}

class TypedVariable extends Variable {
  /**
   * 
   * @param {string} variableName 
   * @param {string} variableType 
   */
  constructor(variableName, variableType) {
    super(variableName);
    this.variableType = variableType;
  }
}

class SetVariable {
  /**
   * 
   * @param {TypedVariable|UntypedVariable} variable 
   * @param {*} value 
   */
  constructor(variable, value) {

  }
}

class ConditionExists {
  /**
   * 
   * @param {string} variable 
   * @param {string} [stateIfExists] State to transition to if variable exists.
   * @param {string} [stateIfNotExists] State to transition to if variable doesn't exist.
   */
  constructor(variable, stateIfExists, stateIfNotExists) {
    this.component = 'System.ConditionExists';
    this.properties = { variable };
    this.transitions = {
      actions: {
        stateIfExists,
        stateIfNotExists,
      }
    };
  }
  /**
   * 
   * @param {string} stateIfExists State to transition to if variable exists.
   */
  setStateIfExists(stateIfExists) {
    this.transitions.actions.exists = stateIfExists;
  }
  /**
   * 
   * @param {string} stateIfNotExists State to transition to if variable doesn't exist.
   */
  setStateIfNotExists(stateIfNotExists) {
    this.transitions.actions.notexists = stateIfNotExists;
  }
}