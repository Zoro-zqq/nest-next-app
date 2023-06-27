import React, { useEffect, useMemo, useRef, Suspense, useState } from 'react'
import { getWebComponentName } from '../../utils/sheet'
function celltoflexV(e: string) {
  switch (e) {
    case 'top':
      return 'start'
    case 'bottom':
      return 'end'
    case 'middle':
    default:
      return 'center'
  }
}
function celltoflexH(e: string) {
  switch (e) {
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
    case 'center':
      return 'center'
    default:
      return 'left'
  }
}

function isExistWebComponent(type: string) {
  return customElements.get(getWebComponentName(type))
}

function ExcelCell({ type, styleObject, col }) {
  const Comp = getWebComponentName(type)
  const calcStyle = useMemo(() => {
    return {
      justifyContent: celltoflexH(styleObject.textAlign),
      alignItems: celltoflexV(styleObject.verticalAlign)
    }
  }, [styleObject])
  return (
    <sheet-cell-input data-col={JSON.stringify(col)} class='sheet-cell-input' style={calcStyle}>
      {!['string', 'textarea'].includes(type) && isExistWebComponent(type) ? <Comp /> : <></>}
    </sheet-cell-input>
  )
}

export default ExcelCell
