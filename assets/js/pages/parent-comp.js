import './../components/LeftSide.js';
import './../components/RightSide.js';
import './../components/BtnElem.js';
import './../components/CountComp.js';
import './../components/ToggleText.js';

// =============================
//  Template
// =============================
const template = document.createElement('template');

template.innerHTML = /* html */ `
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
  crossorigin="anonymous"
/>

<style>
  .parent-container{
    width: 440px;
    height: 150px;
  }
</style>

<div>
  <div class="border rounded my-5 p-4 parent-container">
    <h5>Parent Comp</h5>
    <hr>
    <div class="d-flex">
    <div>
      <btn-elem class="me-4 btn-elem-parent" class-names="btn btn-secondary" btn-event="handle-btn-click-count">Counter increment</btn-elem>
    </div>
    <div>
      <count-comp></count-comp>
      <toggle-text></toggle-text>
    </div>
    </div>
  </div>
  <div class="d-flex">
    <left-side class="me-5 border rounded p-4"></left-side>
    <right-side class="me-5 border rounded p-4"></right-side>
  </div>
</div>
`;

// =============================
//  Class
// =============================
class ParentComp extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this._toggle = false;
    this._toggleTextDatas = ['Hallo', 'World'];

    this.DOM = {};
    this.DOM.countComp = root.querySelector('count-comp');
    this.DOM.leftSide = root.querySelector('left-side');
    this.DOM.rightSide = root.querySelector('right-side');
    this.DOM.btnElemParent = root.querySelector('btn-elem.btn-elem-parent');
    this.DOM.toggleText = root.querySelector('toggle-text');
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.DOM.leftSide.setAttribute('count', newValue);
    this.DOM.rightSide.setAttribute('count', newValue);
    this.DOM.countComp.setAttribute('count', newValue);
  }

  connectedCallback() {
    if (!this.hasAttribute('count')) this.setAttribute('count', '0');

    handleBtnCount(this, this.DOM.btnElemParent, this.DOM.btnElemParent.getAttribute('btn-event'));
    handleBtnCount(this, this.DOM.leftSide, this.DOM.leftSide.getAttribute('btn-event-count'));
    handleBtnCount(this, this.DOM.rightSide, this.DOM.rightSide.getAttribute('btn-event-count'));

    handleBtnReset(this, this.DOM.leftSide, this.DOM.leftSide.getAttribute('btn-event-reset'));

    handleBtnToggle(
      this,
      this.DOM.rightSide,
      this.DOM.rightSide.getAttribute('btn-event-toggle'),
      this.DOM.toggleText,
      this._toggleTextDatas
    );
  }
}

customElements.define('parent-comp', ParentComp);

// =============================
//  Functions
// =============================
function incrementCounter(elem) {
  elem.setAttribute('count', Number(elem.getAttribute('count')) + 1);
}

function handleBtnCount(elem, btn, eventName) {
  btn.addEventListener(eventName, (e) => incrementCounter(elem));
}

function resetCounter(elem) {
  elem.setAttribute('count', '0');
}

function handleBtnReset(elem, btn, eventName) {
  btn.addEventListener(eventName, (e) => resetCounter(elem));
}

function handleBtnToggle(elem, btn, eventName, toggleText, toggleTextDatas) {
  btn.addEventListener(eventName, (e) => {
    elem.toggle = !elem.toggle;

    if (elem.toggle === true) {
      toggleText.output = toggleTextDatas;
      elem.DOM.leftSide.toggleTextOutput = toggleTextDatas;
      elem.DOM.rightSide.toggleTextOutput = toggleTextDatas;
    } else {
      toggleText.output = [];
      elem.DOM.leftSide.toggleTextOutput = [];
      elem.DOM.rightSide.toggleTextOutput = [];
    }

    // Datas from the Button of the attribute 'btn-datas':
    // console.log(e.detail);
  });
}
