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
console.log("test", test);

createApp({
  state: 0,
  reducers: {
    add: (state, amount) => state + amount,
  },
  view: (state, emit) =>
    h(
      "button",
      {
        on: {
          click: () => emit("add", 1),
        },
      },
      [hString(state)]
    ),
}).mount(document.getElementById("app"));
