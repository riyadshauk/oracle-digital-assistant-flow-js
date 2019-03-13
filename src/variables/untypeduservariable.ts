import Variable from './variable';
export default class UntypedUserVariable extends Variable {
  constructor(name: string) {
    super(`user.${name}`);
  }
}