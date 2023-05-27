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
    addAllBtnEvents(this);
  }
}

customElements.define('left-side', LeftSide);

// =============================
//  Functions
// =============================
function handleChildBtn(elem, btn) {
  btn.addEventListener(btn.getAttribute('btn-event'), (e) => {
    elem.dispatchEvent(new CustomEvent(btn.getAttribute('btn-event'), { detail: e.detail }));
  });
}

function addAllBtnEvents(elem) {
  elem.shadowRoot.querySelectorAll('btn-elem').forEach((btn, index) => {
    elem.setAttribute(`btn-event-${index}`, btn.getAttribute('btn-event'));
    handleChildBtn(elem, btn);
  });
}
