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
      <btn-elem class="me-4 btn-elem-parent" class-names="btn btn-secondary">Counter Parent</btn-elem>
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

    this.toggleWithBtnTwo = false;

    this.countComp = root.querySelector('count-comp');
    this.leftSide = root.querySelector('left-side');
    this.rightSide = root.querySelector('right-side');
    this.btnParent = root.querySelector('btn-elem.btn-elem-parent');
    this.toggleText = root.querySelector('toggle-text');
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('parent-comp attributeChangedCallback', name, oldValue, newValue);
    this.leftSide.setAttribute('count', newValue);
    this.rightSide.setAttribute('count', newValue);
    this.countComp.setAttribute('count', newValue);
  }

  connectedCallback() {
    handleChildBtnOne(this, this.btnParent, this.btnParent.getAttribute('btn-event'));
    handleChildBtnOne(this, this.leftSide, this.leftSide.getAttribute('btn-event-one'));
    handleChildBtnOne(this, this.rightSide, this.rightSide.getAttribute('btn-event-one'));
    handleChildBtnTwo(this, this.rightSide, this.rightSide.getAttribute('btn-event-two'));
  }
}

customElements.define('parent-comp', ParentComp);

// =============================
//  Functions
// =============================
function setCounter(elem) {
  elem.setAttribute('count', Number(elem.getAttribute('count')) + 1);
}

function handleChildBtnOne(elem, btn, eventName) {
  btn.addEventListener(eventName, (e) => setCounter(elem));
}

function handleChildBtnTwo(elem, btn, eventName) {
  btn.addEventListener(eventName, (e) => {
    elem.toggleWithBtnTwo = !elem.toggleWithBtnTwo;

    if (elem.toggleWithBtnTwo === true) {
      elem.toggleText.textContent = e.detail;
      elem.leftSide.setAttribute('output', e.detail);
      elem.rightSide.setAttribute('output', e.detail);
    } else {
      elem.toggleText.textContent = '';
      elem.leftSide.setAttribute('output', '');
      elem.rightSide.setAttribute('output', '');
    }
  });
}
