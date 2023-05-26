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
  .counter-output{
    color: red;
    font-size: 22px
  }
</style>

<div class="count-comp-container">
  <b>Counter: </b> <span class="counter-output"></span>
</div>
`;

// =============================
//  Class
// =============================
class CountComp extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.counterOutput = root.querySelector('.counter-output');
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(' Count Comp attributeChangedCallback', name, oldValue, newValue);
    if (name === 'count') this.counterOutput.textContent = newValue;
  }
}

customElements.define('count-comp', CountComp);
