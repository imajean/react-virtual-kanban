import { findDOMNode } from 'react-dom';
import { width } from 'dom-helpers/query';

export function beginDrag(props, _, component) {
  const node = findDOMNode(component);
  const containerWidth = node ? width(node) : 0;

  return {
    row: props.row,
    rowId: props.rowId,
    rowIndex: props.rowIndex,
    listIndex: props.listIndex,
    rowStyle: props.rowStyle,
    containerWidth,
  };
}

function endDrag(props, monitor, component) {
  // added to still dispatch dropRow when row in dropped outside a row dropTarget
  const dropResult = monitor.getDropResult();
  if (!dropResult) {
    const item = monitor.getItem();
    const { rowId, rowIndex, listIndex, listId = null } = item;
    props.dropRow({ rowId: rowId, listId: listId, rowIndex: rowIndex, listIndex: listIndex });
  }
}

export function isDragging({ rowId }, monitor) {
   const draggingRowId = monitor.getItem().rowId;

   return rowId === draggingRowId;
}
