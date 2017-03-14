import { findDOMNode } from 'react-dom';
import { width } from 'dom-helpers/query';

export function beginDrag(props, _, component) {
  const node = findDOMNode(component);
  const containerWidth = node ? width(node) : 0;

  const data = {
    row: props.row,
    rowId: props.rowId,
    rowIndex: props.rowIndex,
    listIndex: props.listIndex,
    rowStyle: props.rowStyle,
    containerWidth,
  };

  props.dragBeginRow(data);

  return data;
}

export function isDragging({ rowId }, monitor) {
   const draggingRowId = monitor.getItem().rowId;

   return rowId === draggingRowId;
}

export function endDrag(props, monitor) {
  const {
    row,
    rowId,
    rowIndex,
    listIndex,
  } = monitor.getItem();

  props.dragEndRow({ row, rowId, rowIndex, listIndex });
}
