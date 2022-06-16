import { defineCustomElement } from './defineCustomElementWithStyles' // way to apply subcomponents styles
import CustomWidget from './AppWidg.vue'

const element = defineCustomElement(CustomWidget)

customElements.define('custom-widget', element)
