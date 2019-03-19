import Variable from '../variables/variable';
export default class FreeMarker {
  text: string;
  variable: {
    [key: string]: Variable,
  };
  constructor() {
    this.variable = {};
  }
  addVariable(variable: Variable, variableName: string): this {
    this.variable[variableName] = variable;
    return this;
  }
  /**
   * @param {string} freeMarker the text to set as the Free Marker Expression for this.
   *
   * NOTE: For some Variable x, use #{x} to later correctly interpolate x as a
   * Free Marker Expression for Oracle BotML (see FreeMarker.interpolate).
   */
  set(freeMarker: string): this {
    this.text = this.interpolate(freeMarker);
    return this;
  }
  getLazyInterpolation(): string {
    return this.text;
  }
  private interpolate(freeMarker: string): string {
    const interpolation = freeMarker.replace(/#{.*?}/g, (substring: string) => {
      const variable = this.variable[substring.replace('#{', '').replace('}', '')];
      return variable.getDisplayName();
    });
    return interpolation;
  }
}