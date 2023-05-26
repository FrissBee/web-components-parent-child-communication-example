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
    <!-- The default value of the attribute "btn-event" is set in "attributeChangedCallback" in its class. -->
    <btn-elem class="btn-elem-one" class-names="btn btn-success">Counter Left Side</btn-elem>
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

    this.countComp = root.querySelector('count-comp');
    this.btnElemOne = root.querySelector('btn-elem.btn-elem-one');
    this.toggleText = root.querySelector('toggle-text');
  }

  static get observedAttributes() {
    return ['count', 'output'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Left Side attributeChangedCallback', name, oldValue, newValue);
    if (name === 'count') this.countComp.setAttribute('count', newValue);
    else if (name === 'output') this.toggleText.textContent = newValue;
  }

  connectedCallback() {
    handleChildBtn(this.btnElemOne, this, this.btnElemOne.btnEvent);
    // console.log('this.btnElemOne.btnEvent', this.btnElemOne.btnEvent);
  }
}

customElements.define('left-side', LeftSide);

// =============================
//  Functions
// =============================
function handleChildBtn(btn, elem, eventName) {
  btn.addEventListener(eventName, (e) => elem.dispatchEvent(new CustomEvent(eventName, { detail: e.detail })));
}
