import State from './state';
export default class CustomComponent extends State {
  constructor(componentType: string, name: string) {
    super(componentType, name);
  }
  setProperties(properties: { [key: string]: any }): this {
    this.properties = properties;
    return this;
  }
}