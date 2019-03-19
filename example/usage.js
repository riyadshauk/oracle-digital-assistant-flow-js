const {
  DigitalAssistant, State, Intent, ConditionExists, Output, SystemList, SystemText,
  SetVariable, ConditionExpression, CopyVariables, Variable, TypedVariable, UntypedVariable,
  UntypedUserVariable, Entity, CustomComponent, FreeMarker,
} = require('../dist/js/lib');

// begin inspiration of how I want my Developer UX to be (top-down approach):
/**
 * Why is this better than the YAML format?
 * - object-oriented (not lots of strings everywhere)
 * => nice dev experience in code editor with syntax highlighting
 * - a flat file structure, rather than nesting (easy to read at a glance)
 * - perhaps most important: an entry into creating a graphic visual builder
 * tool (that interfaces with this library)
 */

// declare and configure bot
const botConfig = {
  platformVersion: '1.0',
  main: true,
  name: 'PizzaBot',
};
const pizzaBot = new DigitalAssistant(botConfig);

pizzaBot.addArbitraryRootProperty({
  parameters: {
    age: 18,
  },
});

// declare defined Entities and map them to the entity names defined in the DA UI
const PizzaSize = new Entity('PizzaSize');
const PizzaType = new Entity('PizzaType');
const PizzaCrust = new Entity('PizzaCrust');
const nlpresult = new Entity('nlpresult');
const YesNo = new Entity('YesNo');

// declare defined Intents and map them to the intent names defined in the DA UI
const order = new Intent('OrderPizza');
const cancel = new Intent('CancelPizza');

// set up context variables
const size = new TypedVariable(PizzaSize, 'size');
const type = new TypedVariable(PizzaType, 'type');
const crust = new TypedVariable(PizzaCrust, 'crust');
const iResult = new TypedVariable(nlpresult, 'iResult');
const sameAsLast = new TypedVariable(YesNo, 'sameAsLast');
pizzaBot.setContext(size, type, crust, iResult, sameAsLast);

// declare some variables to keep track of the previous order
const prevOrder = {
  size: new UntypedUserVariable('size'),
  type: new UntypedUserVariable('type'),
  crust: new UntypedUserVariable('crust'),
};

// declare and define the default intent for this chatbot
const checkLastOrder = new ConditionExists('checkLastOrder');
const lastOrderPrompt = new SystemList('lastOrderPrompt');
const intent = new Intent('intent').setVariable(iResult).addAction(order, checkLastOrder).addAction(cancel, lastOrderPrompt);

// define resolveSize, resolveCrust, resolveType
const resolveSize = new SetVariable('resolveSize').setVariable(size, iResult.values(PizzaSize, 0));
const resolveCrust = new SetVariable('resolveCrust').setVariable(crust, iResult.values(PizzaCrust, 0));
const resolveType = new SetVariable('resolveType').setVariable(type, iResult.values(PizzaType, 0));

// declare and define chooseCrust, chooseSize, chooseType
const chooseCrust = new SystemList('chooseCrust').setVariable(crust)
  .setOptions('Thick', 'Thin', 'Stuffed', 'Pan').setPrompt('What crust do you want for your pizza?');
const chooseSize = new SystemList('chooseSize').setVariable(size)
  .setOptions('Large', 'Medium', 'Small').setPrompt('What size pizza do you want?');
const chooseType = new SystemText('chooseType')
  .setVariable(type).setPrompt('What type of pizza do you want?');

checkLastOrder.setVariable(prevOrder.size).ifExists(lastOrderPrompt).ifNotExists(resolveSize);

lastOrderPrompt.setPrompt('Same pizza as last time?')
  .setOptions('Yes', 'No').setVariable(sameAsLast);

const loadPrevOrder = new CopyVariables('loadPrevOrder')
  .from(prevOrder.size, prevOrder.type, prevOrder.crust)
  .to(size, type, crust);

const usePrevOrder = new ConditionExpression('usePrevOrder')
  .equals(sameAsLast, 'No').then(resolveSize).else(loadPrevOrder);

const saveOrder = new CopyVariables('saveOrder')
  .from(size, type, crust)
  .to(prevOrder.size, prevOrder.type, prevOrder.crust);

const askAge = new Output('How old are you?', 'askAge');
const underAge = new Output('You are too young to order a pizza.', 'underAge').exitFlow();

const needToCheckAge = new ConditionExists('needToCheckAge')
  .setVariable(prevOrder.size).ifExists(chooseCrust).ifNotExists(askAge);

// declare and define checkAge
const checkAge = new CustomComponent('AgeChecker', 'checkAge');
const allow = new Intent('allow'); // custom Intent defined in Component in DA UI
const block = new Intent('block'); // custom Intent defined in Component in DA UI
checkAge.setProperties({
  minAge: 18,
}).addAction(allow, chooseCrust).addAction(block, underAge);

const cancelOrder = new Output('Your order is cancelled', 'cancelOrder').exitFlow();
const unresolved = new Output("I don't understand. What do you want to do?", 'unresolved').exitFlow();

const doneFreeMarker = new FreeMarker().addVariable(size, 'size').addVariable(type, 'type')
  // eslint-disable-next-line no-template-curly-in-string
  .set('Your ${#{size}.value} ${#{type}.value} pizza is on its way');
const done = new Output(doneFreeMarker.getLazyInterpolation(), 'done').exitFlow();

// add states to bot in the order that makes sense:
const states = [
  intent,
  checkLastOrder,
  lastOrderPrompt,
  usePrevOrder,
  resolveSize,
  resolveCrust,
  resolveType,
  needToCheckAge,
  askAge,
  checkAge,
  loadPrevOrder,
  chooseCrust,
  chooseSize,
  chooseType,
  saveOrder,
  done,
  underAge,
  cancelOrder,
  unresolved,
];
pizzaBot.addState(...states);

// call .yaml() to obtain YAML version of the bot
const yaml = pizzaBot.yaml();

// console.log('pizzaBot:', JSON.stringify(pizzaBot, undefined, 2));

// eslint-disable-next-line no-console
console.log('pizzaBot yaml:\n', yaml);