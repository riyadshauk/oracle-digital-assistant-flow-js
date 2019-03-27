/* eslint-disable no-template-curly-in-string */
class PizzaBotWithMemory {
  constructor() {
    this.platformVersion = 1.0;
    this.name = 'PizzaBot';
    this.context = {
      variables: {
        size: 'PizzaSize',
        type: 'PizzaType',
        crust: 'PizzaCrust',
        iResult: 'nlpresult',
        sameAsLast: 'YesNo',
      },
    };
    this.states = {};
    this.states.intent = { // new Intent()
      component: 'System.Intent',
      properties: {
        variable: 'iResult',
      },
      transitions: {
        actions: {
          OrderPizza: 'checklastorder',
          CancelPizza: 'cancelorder',
          unresolvedIntent: 'unresolved',
        },
      },
    };
    this.states.checklastorder = { // new ConditionExists()
      component: 'System.ConditionExists',
      properties: {
        variable: 'user.lastsize',
      },
      transitions: {
        actions: {
          exists: 'lastorderprompt',
          notexists: 'resolvesize',
        },
      },
    };
    this.states.lastorderprompt = { // new SystemList()
      component: 'System.List',
      properties: {
        options: 'Yes,No',
        prompt: 'Same pizza as last time?',
        variable: 'sameAsLast',
      },
      transitions: {},
    };
    this.states.rememberchoice = { // new ConditionEquals()
      component: 'System.ConditionEquals',
      properties: {
        variable: 'sameAsLast',
        value: 'No',
      },
      transitions: {
        actions: {
          equal: 'resolvesize',
          notequal: 'load',
        },
      },
    };
    this.states.resolvesize = { // new SetVariable()
      component: 'System.SetVariable',
      properties: {
        variable: 'size',
        value: "${iResult.value.entityMatches['PizzaSize'][0]}",
      },
      transitions: {},
    };
    this.states.resolvecrust = { // new SetVariable()
      component: 'System.SetVariable',
      properties: {
        variable: 'crust',
        value: "${iResult.value.entityMatches['PizzaCrust'][0]}",
      },
      transitions: {},
    };
    this.states.resolvetype = { // new SetVariable()
      component: 'System.SetVariable',
      properties: {
        variable: 'type',
        value: "${iResult.value.entityMatches['PizzaType'][0]}",
      },
      transitions: {},
    };
    this.states.needcheckage = { // new ConditionExists()
      component: 'System.ConditionExists',
      properties: {
        variable: 'user.lastsize',
      },
      transitions: {
        actions: {
          exists: 'crust',
          notexists: 'askage',
        },
      },
    };
    this.states.askage = { // new Output()
      component: 'System.Output',
      properties: {
        text: 'How old are you?',
      },
      transitions: {},
    };
    this.states.checkage = { // new CustomComponent('AgeChecker')
      component: 'AgeChecker',
      properties: {
        minAge: 18,
      },
      transitions: {
        actions: {
          allow: 'crust',
          block: 'underage',
        },
      },
    };
    this.states.load = {
      component: 'System.CopyVariables',
      properties: {
        from: 'user.lastsize,user.lasttype,user.lastcrust',
        to: 'size,type,crust',
      },
      transtions: {},
    };
    this.states.crust = { // new Component.System.List()
      component: 'System.List',
      properties: {
        options: 'Thick,Thin,Stuffed,Pan',
        prompt: 'What crust do you want for your Pizza?',
        variable: 'crust',
      },
      transitions: {},
    };
    this.states.size = { // new system.List()
      component: 'System.List',
      properties: {
        options: 'Large,Medium,Small',
        prompt: 'What size Pizza do you want?',
        variable: 'size',
      },
      transitions: {},
    };
    this.states.type = { // new system.Text()
      component: 'System.Text',
      properties: {
        prompt: 'What type of Pizza do you want?',
        variable: 'type',
      },
      transitions: {},
    };
    this.states.save = { // new system.CopyVariables()
      component: 'System.CopyVariables',
      properties: {
        from: 'size,type,crust',
        to: 'user.lastsize,user.lasttype,user.lastcrust',
      },
      transitions: {},
    };
    this.states.done = { // new system.Output()
      component: 'System.Output',
      properties: {
        text: 'Your ${size.value} ${type.value} Pizza is on its way.',
      },
      transitions: {
        return: 'done',
      },
    };
    this.states.underage = { // new system.Output()
      component: 'System.Output',
      properties: {
        text: 'You are too young to order a pizza',
      },
      transitions: {
        return: 'underage',
      },
    };
    this.states.cancelorder = { // new system.Output()
      component: 'System.Output',
      properties: {
        text: 'Your order is cancelled',
      },
      transitions: {
        return: 'cancelOrder',
      },
    };
    this.states.unresolved = { // new system.Output()
      component: 'System.Output',
      properties: {
        text: "I don't understand. What do you want to do?",
      },
      transitions: {
        return: 'unresolved',
      },
    };
  }
}