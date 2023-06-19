import CellInput from './cellInput'
import SheetCheckbox from '../settings/sheetCells/checkbox'
export function defineElements() {
  if (!customElements.get('sheet-cell-input')) {
    customElements.define('sheet-cell-input', CellInput)
  }
  if (!customElements.get('sheet-checkbox')) {
    customElements.define('sheet-checkbox', SheetCheckbox)
  }
}
