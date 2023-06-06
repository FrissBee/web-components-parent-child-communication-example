// Import of the components here not necessary, because they are imported in "assets\js\pages\parent-comp.js"

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
.left-side-container{
  width: 200px;
  height: 260px;
}
</style>

<div class="left-side-container">
  <h5>Left Side</h5>
  <hr>
  <count-comp></count-comp>
  <div class="mt-4">
    <btn-elem class="btn-elem-count" class-names="btn btn-success" btn-event="handle-btn-click-count">Counter increment</btn-elem>
  </div>
  <div class="mt-4">
    <btn-elem class="btn-elem-reset" class-names="btn btn-danger" btn-event="handle-btn-click-reset">Counter reset</btn-elem>
  </div>
  <div class="mt-4">
    <toggle-text></toggle-text>
  </div>
</div>
`;

// =============================
//  Class
// =============================
class LeftSide extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this._toggleTextOutput = [];

    this.DOM = {};
    this.DOM.btnElemCount = root.querySelector('btn-elem.btn-elem-count');
    this.DOM.btnElemReset = root.querySelector('btn-elem.btn-elem-reset');
    this.DOM.countComp = root.querySelector('count-comp');
    this.DOM.toggleText = root.querySelector('toggle-text');
  }

  set toggleTextOutput(value) {
    this._toggleTextOutput = value;
    this.DOM.toggleText.output = value;
  }

  get toggleTextOutput() {
    return this._toggleTextOutput;
  }

  static get observedAttributes() {
    return ['count', 'output'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') this.DOM.countComp.setAttribute('count', newValue);
    else if (name === 'output') this.DOM.toggleText.textContent = newValue;
  }

  connectedCallback() {
    this.setAttribute('btn-event-count', this.DOM.btnElemCount.getAttribute('btn-event'));
    this.setAttribute('btn-event-reset', this.DOM.btnElemReset.getAttribute('btn-event'));
    handleBtnClick(this, this.DOM.btnElemCount);
    handleBtnClick(this, this.DOM.btnElemReset);
  }
}

customElements.define('left-side', LeftSide);

// =============================
//  Functions
// =============================
function handleBtnClick(elem, btn) {
  const btnEvent = btn.getAttribute('btn-event');
  btn.addEventListener(btnEvent, (e) => {
    elem.dispatchEvent(new CustomEvent(btnEvent, { detail: e.detail }));
  });
}
