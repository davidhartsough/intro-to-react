# Intro to React

> A JavaScript library for building user interfaces

— Facebook (the creators/maintainers of this thing)

**Table of Contents**

- [What is React?](#what-is-react)
- [Components](#components)
- [JSX](#jsx)
- [Props](#props)
- [State](#state)
- [Rendering](#rendering)
- [Create React App](#create-react-app)
- [Effects](#effects)

---

## Assumptions

This assumes you already are familiar with ES6, especially ...

- Variable declaration with `const` and `let`
- Arrow functions `const getRandomBool = () => Math.random() >= 0.5;`
- Object shorthand `const key = "value"; const obj = { key };`
- Object destructuring `const { key } = obj;`
- Array destructuring `const [item] = arr;`
- Array spread operator `const copy = [...arr];`
- .map array method `const itemNames = items.map(item => item.name);`
- String template literals

```js
// variable declaration with const or let
const dontChangeMyType = 1;
let goAheadChangeMe = 1;
goAheadChangeMe = false;
// object shorthand
const key = "value";
const obj = { key };
// object destructuring
const object = { keyName: "val" };
const { keyName } = object;
// arrow functions
const getRandomBool = () => Math.random() >= 0.5;
// array spread operator
const arr = [{ name: "Steve" }, { name: "Alicia" }];
const people = [...arr, { name: "Bob" }];
// .map array method
const names = people.map(person => person.name);
// array destructuring
const [steve, alicia, bob] = names;
// string template literals
const greeting = `Hey, ${steve}!`;
```

---

## What is React?

React allows you to build an app interface out of a composition of **components** (written in **JSX**).

That's it. It doesn't do everything, nor does it wish to. It's not a full-stack framework; It is merely the interface layer of an app (AKA the "frontend" or "client-side").

## Components

Components are the core of React.

React is a means of creating reusable, self-contained components. Components are the building blocks of an app's interface. These UI components manage their own state and logic in JavaScript instead of templates.

> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

### Composition

How you componentize your app's UI is up to you, but React is intended to be a tool for breaking down the interface into reusable parts:

> A good rule of thumb is that _if_ a part of your UI is used several times (buttons, panels, avatars, etc), or is complex enough on its own, _then_ it is a good candidate to be a reusable component.

```js
const shouldComponentize = part.used > 1 || part.complexity !== "super simple";
```

At the end of the day, React helps you build your whole UI for your app in one Component that contains several other Components therein (which also have their own Components, and so on).

#### Example

A calendar app might have a root App Component with a Month Component that has some Week Components that have Day Components that have Event Components that have Event Detail Components and Action Button Components. BOOM. There's your calendar app UI built with reusable components.

App —> Month —> Week —> Day —> Event —> Detail —> Action

### Syntax

Syntactically, React components are just JavaScript functions. They accept one parameter (called props, which we'll get into in just a moment) and return an element tree in JSX syntax, which we'll also cover next.

#### Example

```js
// Here's a component called App. We aren't gonna do anything with the "props" parameter yet.
function App(props) {
  // This returns a single HTML element, as declared in this fancy JSX syntax.
  return <h1>Wow! This is a neat component.</h1>;
}
```

## JSX

> JSX is an XML/HTML like extension to JavaScript.

JSX stands for JavaScript XML. (XML stands for Extensible Markup Language.) It looks a lot like normal HTML element tree, but you'll see some notable differences: namely the inclusion of JavaScript expressions in curly brackets.

```js
function Clock() {
  return <p>It's {new Date().toString()}</p>;
}
```

(See [`clock.html`](https://davidhartsough.com/intro-to-react/examples/clock.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/clock.html).)

JSX allows you to create components that mix your logic and data with your markup — tastefully. (By that I mean: better than template languages.)

> React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

### Example 1

```js
const RandomPhoto = () => <img src="https://picsum.photos/200" />;
function App() {
  return (
    <main>
      <h1>Here are 3 random photos</h1>
      <RandomPhoto />
      <RandomPhoto />
      <RandomPhoto />
    </main>
  );
}
```

(See [`random.html`](https://davidhartsough.com/intro-to-react/examples/random.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/random.html).)

This demonstrates another beauty of JSX: components become custom markup "elements", which are always denoted with capital letters. (Every component _must_ begin with a capital letter; otherwise React treats anything starting with lowercase letters as HTML DOM tags.) In this case, the RandomPhoto component is reused thrice and rendered inside the App component's element tree.

### Example 2

```js
function ColorList() {
  const colors = ["red", "blue", "purple"];
  return (
    <ul>
      {colors.map(color => (
        <li key={color} style={{ color }}>
          {color}
        </li>
      ))}
    </ul>
  );
}
```

(See [`color-list.html`](https://davidhartsough.com/intro-to-react/examples/color-list.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/color-list.html).)

Here we use a JavaScript array of strings (in the `colors` variable) to create 3 `<li>` elements and stylize the font of each with its respective color.

In JSX, we pass JS expressions to build the element tree, be children content of elements, or provide values to element attributes. This attribute syntax is also how JSX allows you to pass data to components as "props".

## Props

As stated before, components are just functions, syntactically speaking. And component functions only ever receive one parameter: props. This parameter is always an object. Props is short for "properties", and it's the chosen term React uses to refer to the single object argument passed to every React component. Each key-value pair in this object is referred to as an individual "prop".

But this terminology is not nearly as important as understanding the simple concept, so let's just look at examples:

```js
function ColorListItem({ color }) {
  return <li style={{ color }}>{color}</li>;
}
function ColorList({ colors }) {
  return (
    <ul>
      {colors.map(color => (
        <ColorListItem key={color} color={color} />
      ))}
    </ul>
  );
}
function ShadedColorList({ shade }) {
  return (
    <ul>
      <ColorListItem color={`${shade}Green`} />
      <ColorListItem color={`${shade}Blue`} />
      <ColorListItem color={`${shade}SlateGray`} />
    </ul>
  );
}
function App() {
  return (
    <>
      <ColorList colors={["red", "blue", "purple"]} />
      <ShadedColorList shade="Dark" />
      <ShadedColorList shade="Light" />
    </>
  );
}
```

(See [`color-lists.html`](https://davidhartsough.com/intro-to-react/examples/color-lists.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/color-lists.html).)

Every component is a function. Every component function recieves one parameter called props. Every props argument is an object. Every key-value pair is an individual prop. Every prop is passed to a component via HTML-attribute-like syntax in JSX.

(By the way, the empty parent element tags in `App` are called [React Fragments](https://reactjs.org/docs/fragments.html). Read more at that link if you're curious about the need for that syntax.)

```js
function Greeting({ name = "Steve", formal = false }) {
  if (formal) return <p>Hello, {name}.</p>;
  return <p>Hey, {name}!</p>;
}
function Layout({ title, children }) {
  return (
    <main>
      <header>
        <h1>{title}</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}
function App() {
  return (
    <Layout title="Time to say hi to my friends">
      <Greeting name="Stephanie" />
      <Greeting name="Alicia" formal={true} />
      <Greeting />
    </Layout>
  );
}
```

(See [`greeting.html`](https://davidhartsough.com/intro-to-react/examples/greeting.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/greeting.html).)

This demonstrates the use of default props and "children" props. To set defaults for a component's props, all you have to do is set defaults for the function parameter.

If you put JSX inside a component's element tag, those elements are passed as a single prop called "children" to that parent component. In this example, the Layout component is expecting to receive children and render them in a specific section of its element tree.

## State

State is React's way of letting a component control/manage itself. With a React component's state you can create variables that, when changed, will rerender the component. This essentially means that you can create variables that the component observes and listens for changes to rerender. This state variables are internally managed by the component to determine behavior and allow for dynamicity and interactivity.

Unlike props, state can be mutated and is reserved only for interactivity / data that changes over time. Its function is to manage the current conditions of its component.

```js
function Clicker() {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const handleClick = () => setHasBeenClicked(true);
  return (
    <h1>
      Wow! I have <em>{clickedStatus ? "definitely" : "never"}</em> been
      clicked.
    </h1>
  );
}
```

(See [`clicker.html`](https://davidhartsough.com/intro-to-react/examples/clicker.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/clicker.html).)

### Syntax

State is optional, so to declaratively include state, you must invoke `useState`, which you import from React. `useState` accepts one parameter, which sets the default for the state variable, and then it returns a pair (array) of values: `[1]` the current state variable and `[2]` a function that updates it. Best practices encourage you to destructure this returned array into two separate variables that should be named as a pair. The first returned value should be the name of the local variable itself (ex: `age` or `color`), but the second returned value should be named the same but with "set" as a prefix and then camelCase following (ex: `setAge` or `setColor`).

```js
const Greeting = ({ name }) => <h1>Hey, {name}!</h1>;
function NameForm() {
  const [name, setName] = useState("Steve");
  const handleNameChange = ({ target }) => setName(target.value);
  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <hr />
      <Greeting name={name} />
    </div>
  );
}
```

(See [`name-form.html`](https://davidhartsough.com/intro-to-react/examples/name-form.html) and [source](https://github.com/davidhartsough/intro-to-react/blob/master/examples/name-form.html).)

## Rendering

So it's about dang time I showed you how to actually render any of these components you've been making. And the good news is that it's just a dead simple one-liner call to `ReactDom.render()`.

```js
const App = () => <h1>Wow! This is a neat component.</h1>;
ReactDOM.render(<App />, document.getElementById("root"));
```

`ReactDom.render()` expects two parameters: first, which React component you'd like to render, and second, which DOM element you'd like to render (inject) your component into.

Yep. That's it.

## Create React App

So far we've only tried things out in an HTML file with CDN imports of development JS files and then inline Babel scripts... That's not the real deal. It's just for testing in a tiny sandbox. If you actually want to create a legit, production-ready React app, use [**Create React App**](https://create-react-app.dev/) ([GitHub](https://github.com/facebook/create-react-app)).

Wanna try it? If you have Node >= 8.10 and npm >= 5.6 on your machine, then just run these commands in your terminal:

```bash
npx create-react-app my-app
cd my-app
npm start
```

Open that sucka in your favorite code editor (`code .`) and watch as you see some _hot hot hot_ reloading action. (The `npm start` command serves your React app _and_ runs a file watcher that rebuilds the app every time you save changes to a `src` file.)

Have fun!

## Effects

Oh yeah, you might want to know about these things React calls "Effects". Basically, when you `useEffect` in your component, it allows you to (1) track prop and state changes or (2) run code once at the very beginning of a component's life (when it's first mounted to the DOM). If you're tracking changes to your component's props, you can do "side effects", like manually changing the DOM. But more often than not, you'll want to use `useEffect` as a means to fetch data when the component is first loaded/mounted/rendered.

> Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

To use `useEffect`, you simply call it as a function inside your component function, after any state variables are declared. The function accepts two parameters: (1) a function to fire as the "side effect" and (2) an array of which prop or state variables to observe. The second parameter is optional, and, if omitted, the effect will run the first parameter function on _every_ render. The second parameter's purpose is to limit when the effect should fire. If you give a prop or state variable to the array (as the second parameter), then the effect will only be triggered when that prop or state variable changes. If you give `useEffect` an empty array as the second parameter, then it will only fire the effect **once** at the first mount of the component. (And for me personally, _that_ is the most important and frequently use case for my components.)

If you need to "clean up" after yourself with the code you run inside your effect, then you should put _that_ code inside a function as the `return` of the first parameter function. That way, React knows to call that function you returned when the component is going to unmount or when one of the dependencies variables in your second parameter array changes. Usually the only use cases for this are effects that use subscriptions, setTimeout, or setInterval. (Otherwise, I don't really find myself needing to "clean up".)

I find myself using the `useEffect` function when I need to fetch data from my database and put that data into state variables I've already declared.

```js
const ColorList = () => {
  const [colorData, setColorData] = useState([]);
  useEffect(
    /* parameter 1: the side effect function */ () =>
      fetch("/colors.json")
        .then(response => response.json())
        .then(({ colors }) => setColorData(colors))
        .catch(console.warn),
    /* parameter 2: the dependencies array */ []
  );
  return ( /* ... */ );
};
```

If I needed to fetch a specific item from my database, based on a prop, then that would look like so:

```js
const url = "https://api.colors.com/v1/colors/";
const ColorDetail = ({ colorId }) => {
  const [color, setColor] = useState({});
  useEffect(
    /* parameter 1: the side effect function */ () =>
      fetch(`${url}${colorId}`)
        .then(response => response.json())
        .then(setColor)
        .catch(console.warn),
    /* parameter 2: the dependencies array */ [colorId]
  );
  return ( /* ... */ );
};
```

And here's the classic example of DOM manipulation:

```js
function Greeting({ name = "Steve" }) {
  useEffect(() => {
    document.title = `Hey, ${name}!`;
  }, [name]);
  return <p>Hey, {name}!</p>;
}
```

Finally, here's a subscription example:

```js
function OnlineStatusIndicator({ personId }) {
  useEffect(() => {
    function handleStatusChange(status) {
      // ...
    }
    PeopleAPI.subscribeToPersonStatus(personId, handleStatusChange);
    // Clean up the subscription on unmount AND anytime personId changes.
    return () => {
      PeopleAPI.unsubscribeFromPersonStatus(personId, handleStatusChange);
    };
  }, [personId]);
  return ( /* ... */ );
}
```

## Boom bop!

That's it! Thank you, come again!
