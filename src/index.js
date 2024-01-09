import { h, hFragment, hString, createApp } from "./roli";

console.log("ready to start coding");

const test = h("div", { className: "test" }, [
  h("h1", {}, "My Counter"),
  h("div", { class: "container" }, [
    h("button", { class: "btn btn-primary" }, ["decrement"]),
    h("span", {}, ["0"]),
    h("button", { class: "btn btn-secondary" }, ["increment"]),
  ]),
]);
// console.log("test", test);

// createApp({
//   state: 0,
//   reducers: {
//     add: (state, amount) => state + amount,
//   },
//   view: (state, emit) =>
//     h(
//       "button",
//       {
//         on: {
//           click: () => emit("add", 1),
//         },
//       },
//       [hString(state)]
//     ),
// }).mount(document.getElementById("app"));

const initialState = {
  counter: 0,
};
const reducers = {
  increment: (state) => ({ ...state, counter: state.counter + 1 }),
  decrement: (state) => ({ ...state, counter: state.count - 1 }),
};

const view = (state, emit) => {
  return h("div", { class: "wrapper" }, [
    h(
      "button",
      {
        on: {
          click: () => emit("decrement"),
        },
      },
      ["-"]
    ),
    h("span", {}, [hString(state.counter)]),
    h(
      "button",
      {
        on: {
          click: () => emit("increment"),
        },
      },
      ["+"]
    ),
  ]);
};

createApp({ state: initialState, reducers, view }).mount(
  document.getElementById("app")
);
