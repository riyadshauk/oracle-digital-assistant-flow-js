import State from './state';
import Intent from './intent';
import Variable from '../variables/variable';
export default class ConditionExpression extends State {
  private static equalIntent = new Intent('equal');
  private static notEqualIntent = new Intent('notequal');
  private value: any;
  constructor(name: string) {
    super('System.ConditionEquals', name);
  }
  /**
   *
   * @param {string} source 
   * @example <#if age.value gt 18>true<#else>false</#if>
   * 
   * @see https://docs.oracle.com/en/cloud/paas/digital-assistant/use-chatbot/built-components-properties-transitions-and-usage.html#GUID-A41D3E53-76DE-49DB-B686-F0EBDE538349
   * @see https://freemarker.apache.org/docs/dgui_template_exp.html#dgui_template_exp_logicalop
   * @see https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf
   */
  private setSourceExpression(source: string): this {
    this.properties.source = source;
    delete this.properties.variable; // to keep output YAML concise/clean
    return this;
  }
  private setValue(value: boolean|number|string): this {
    this.properties.value = value;
    this.value = value;
    return this;
  }
  /**
   * 
   * @param source 
   * @param value 
   * @param expression 
   * 
   * @usage if freeMarkerExpression then blah1 else blah2 . Just provide a freeMarkerExpression
   * 
   * @description If you want to do something more complex, like nested if-then statements,
   * compound statements (eg, using logical operators with if-then logic)... then just
   * go ahead and use a Free Marker Expression.
   * These don't look that great, but they get the job done.
   * Using Free Marker expressions with Oracle BotML (and this JavaScript library) will require reading through quite a bit of documentation....
   * 
   * @disclaimer As an alternative, I highly recommend just creating your own Custom Component, then
   * programming your own JavaScript code in an Embedded Component scaffold, and uploading
   * that to Oracle Digital Assistant. Doing complex logic directly in a high-level
   * programming language like JavaScript is much easier than attempting to do high-level
   * logic essentially inside of a Flow BOTML-flavored YAML file stored in the 
   * Oracle Digital Assistant cloud console.
   * 
   * @see https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf
   * @see https://freemarker.apache.org/docs/dgui_template_exp.html#dgui_template_exp_logicalop
   * @see https://docs.oracle.com/en/cloud/paas/digital-assistant/use-chatbot/built-components-properties-transitions-and-usage.html#GUID-A41D3E53-76DE-49DB-B686-F0EBDE538349
   */
  private defineExpression(source: Variable|string, value: string|boolean|number, expression: string): this {
    value = typeof value === 'string' ? `"${value}"` : value;
    this.setValue(true);
    return this.setSourceExpression(`<#if ${(source as Variable).getDisplayName() || source} ${expression} ${value}>true<#else>false</#if>`);
  }
  /**
   * 
   * @param {Variable|string} source 
   * @param {string|boolean|number|string} value 
   */
  equals(source: Variable|string, value: string|boolean|number): this {
    return this.defineExpression(source, value, '==');
  }
  /**
   * 
   * @param {Variable|string} source 
   * @param {string|boolean|number} value 
   */
  greaterThan(source: Variable|string, value: string|boolean|number): this {
    return this.defineExpression(source, value, 'gt');
  }
  /**
   * 
   * @param {Variable|string} source 
   * @param {string|boolean|number} value 
   */
  lessThan(source: Variable|string, value: string|boolean|number): this {
    return this.defineExpression(source, value, 'lt');
  }
  /**
   * 
   * @param {Variable|string} source 
   * @param {string|boolean|number} value 
   */
  greaterThanOrEqual(source: Variable|string, value: string|boolean|number): this {
    return this.defineExpression(source, value, 'gte');
  }
  /**
   * 
   * @param {Variable|string} source 
   * @param {string|boolean|number} value 
   */
  lessThanOrEqual(source: Variable|string, value: string|boolean|number): this {
    return this.defineExpression(source, value, 'lte');
  }
  then(action: State): this {
    this.addAction(ConditionExpression.equalIntent, action);
    return this;
  }
  else(action: State): this {
    this.addAction(ConditionExpression.notEqualIntent, action);
    return this;
  }
}