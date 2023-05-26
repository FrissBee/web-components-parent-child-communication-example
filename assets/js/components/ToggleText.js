// =============================
//  Template
// =============================
const template = document.createElement('template');

template.innerHTML = /* html */ `
<style>
  .parent-output{
    color: red
  }
</style>

<div class="parent-output">
  <slot></slot>
</div>
`;

// =============================
//  Class
// =============================
class ToggleText extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.parentOutput = root.querySelector('.parent-output');
  }
}

customElements.define('toggle-text', ToggleText);
