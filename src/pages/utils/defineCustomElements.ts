import CellInput from './cellInput'
import WebSheetCheckBoxJSX from '../settings/sheetCells/checkbox'
export function defineElements() {
  if (!customElements.get('sheet-cell-input')) {
    let sheetCellInput = CellInput()
    if (sheetCellInput) {
      customElements.define('sheet-cell-input', sheetCellInput)
    }
  }
  if (!customElements.get('sheet-checkbox')) {
    let SheetCheckbox = WebSheetCheckBoxJSX()
    if (SheetCheckbox) {
      customElements.define('sheet-checkbox', SheetCheckbox)
    }
  }
}
