import Variable from './variable';
export default class UntypedUserVariable extends Variable {
  // private static userCount = 1;
  constructor(name: string) {
    super(`user.${name}`);
    // @override
    // this.id = `user.${UntypedUserVariable.userCount++}`;
  }
}