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
.right-side-container{
  width: 200px;
  height: 260px;
}
</style>

<div class="right-side-container">
  <h5>Right Side</h5>
  <hr>
  <count-comp></count-comp>
  <div class="mt-4">
    <btn-elem class="btn-elem-count" btn-event="handle-btn-click-count">Counter Right Side</btn-elem>
  </div>
  <div class="mt-4">
    <btn-elem class="btn-elem-toggle" class-names="btn btn-warning" btn-event="handle-btn-click-toggle" btn-datas="Hello World">Show/Hide Text</btn-elem>
  </div>
  <div class="mt-4">
    <div class="mt-4 output-right-side"></div>
    <toggle-text></toggle-text>
  </div>
</div>
`;

// =============================
//  Class
// =============================
class RightSide extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.btnElemCount = root.querySelector('btn-elem.btn-elem-count');
    this.btnElemToggle = root.querySelector('btn-elem.btn-elem-toggle');
    this.countComp = root.querySelector('count-comp');
    this.toggleText = root.querySelector('toggle-text');
  }

  static get observedAttributes() {
    return ['count', 'output'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') this.countComp.setAttribute('count', newValue);
    if (name === 'output') this.toggleText.textContent = newValue;
  }

  connectedCallback() {
    this.setAttribute('btn-event-count', this.btnElemCount.getAttribute('btn-event'));
    this.setAttribute('btn-event-toggle', this.btnElemToggle.getAttribute('btn-event'));
    handleChildBtn(this, this.btnElemCount);
    handleChildBtn(this, this.btnElemToggle);
  }
}

customElements.define('right-side', RightSide);

// =============================
//  Functions
// =============================
function handleChildBtn(elem, btn) {
  const btnEvent = btn.getAttribute('btn-event');
  btn.addEventListener(btnEvent, (e) => {
    elem.dispatchEvent(new CustomEvent(btnEvent, { detail: e.detail }));
  });
}
