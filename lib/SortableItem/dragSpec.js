'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDrag = beginDrag;
exports.endDrag = endDrag;
exports.isDragging = isDragging;

var _reactDom = require('react-dom');

var _query = require('dom-helpers/query');

function beginDrag(props, _, component) {
  var node = (0, _reactDom.findDOMNode)(component);
  var containerWidth = node ? (0, _query.width)(node) : 0;

  return {
    row: props.row,
    rowId: props.rowId,
    rowIndex: props.rowIndex,
    listIndex: props.listIndex,
    rowStyle: props.rowStyle,
    containerWidth: containerWidth
  };
}

function endDrag(props, monitor, component) {
  // added to still dispatch dropRow when row in dropped outside a row dropTarget
  var dropResult = monitor.getDropResult();
  if (!dropResult) {
    var item = monitor.getItem();
    var rowId = item.rowId,
        rowIndex = item.rowIndex,
        listIndex = item.listIndex,
        _item$listId = item.listId,
        listId = _item$listId === undefined ? null : _item$listId;

    props.dropRow({ rowId: rowId, listId: listId, rowIndex: rowIndex, listIndex: listIndex });
  }
}

function isDragging(_ref, monitor) {
  var rowId = _ref.rowId;

  var draggingRowId = monitor.getItem().rowId;

  return rowId === draggingRowId;
}