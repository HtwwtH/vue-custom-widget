import { defineCustomElement } from './defineCustomElementWithStyles' // way to apply subcomponents styles
import CustomWidget from './AppWidget.vue'

const element = defineCustomElement(CustomWidget)

customElements.define('custom-widget', element)
