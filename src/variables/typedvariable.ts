import Entity from '../misc/entity';
import Type from '../misc/type';
import Variable from './variable';
export default class TypedVariable extends Variable {
  type: string;
  constructor(type: Entity|Type, name: string) {
    super(name);
    this.type = type.name;
  }
}