import Variable from './variable';
export default class UntypedVariable extends Variable {
  // eslint-disable-next-line no-useless-constructor
  constructor(name: string) {
    super(name);
  }
}