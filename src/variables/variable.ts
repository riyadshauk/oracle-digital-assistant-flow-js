import Entity from '../misc/entity';
import String from '../helpers/string';
export default abstract class Variable {
  private static count = 1;
  // private static variables: Variable[] = [];
  id: string;
  name: String;
  constructor(name?: string) {
    this.id = this.generateUID();
    this.name = new String(name);
    // Variable.variables.push(this);
  }
  private generateUID(): string {
    return `Variable${Variable.count++}`;
  }
  changeName(name: string) {
    this.name.replaceValue(name);
    return this;
  }
  getName(): string {
    return this.name.str;
  }
  getDisplayName(): string {
    return this.getName();
  }
  /**
   * 
   * @param {Entity} entity 
   * @param {number} position The position in the matched array, starting from the most recent value matched.
   * @see https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/e6ee15e8-2e68-4a1a-adad-eac941a469d4/File/e7d9cf54cd5f543e83971fd26588e232/apachefreemarkerinbotml_v2.pdf (page 9)
   * @example
   * calling: resolveSize.setVariable(size, iResult.values(PizzaSize).pos(0));
   * should result in this being generated in the end-YAML: "${iResult.value.entityMatches['PizzaSize'][0]}"
   */
  values(entity: Entity, position: number): string {
    return `\${${this.getDisplayName()}.value.entityMatches['${entity.name}'][${position}]}`;
  }
}