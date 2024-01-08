import { DOM_TYPES } from "../h";
import { setAttributes } from "../utils/attributes";
import { addEventListeners } from "../utils/events";

export function mountDom(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNodes(vdom, parentEl);
      break;
    default:
      throw new Error(`type ${vdom.type} is an unknown element type`);
  }
}

function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode;

  parentEl.append(textNode);
}

function createFragmentNodes(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child) => mountDom(child, parentEl));
}

function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;

  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;

  children.forEach((child) => mountDom(child, element));
  parentEl.append(element);
}

function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props;

  vdom.listeners = addEventListeners(events, el);
  setAttributes(el, attrs);
}
