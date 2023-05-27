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
    <btn-elem class="btn-elem-one">Counter Right Side</btn-elem>
  </div>
  <div class="mt-4">
    <btn-elem class="btn-elem-two" class-names="btn btn-warning" btn-event="handle-btn-click-toggle" btn-datas="Hello World">Show/Hide Text</btn-elem>
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

    this.countComp = root.querySelector('count-comp');
    this.btnElemOne = root.querySelector('btn-elem.btn-elem-one');
    this.btnElemTwo = root.querySelector('btn-elem.btn-elem-two');
    this.toggleText = root.querySelector('toggle-text');
  }

  static get observedAttributes() {
    return ['count', 'output'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Right Side attributeChangedCallback', name, oldValue, newValue);
    if (name === 'count') this.countComp.setAttribute('count', newValue);
    if (name === 'output') this.toggleText.textContent = newValue;
  }

  connectedCallback() {
    this.setAttribute('btn-event-one', this.btnElemOne.getAttribute('btn-event'));
    this.setAttribute('btn-event-two', this.btnElemTwo.getAttribute('btn-event'));
    handleChildBtn(this, this.btnElemOne);
    handleChildBtn(this, this.btnElemTwo);
  }
}

customElements.define('right-side', RightSide);

// =============================
//  Functions
// =============================
function handleChildBtn(elem, btn) {
  btn.addEventListener(btn.getAttribute('btn-event'), (e) => {
    elem.dispatchEvent(new CustomEvent(btn.getAttribute('btn-event'), { detail: e.detail }));
  });
}
