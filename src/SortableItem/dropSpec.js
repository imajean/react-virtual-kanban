import { findDOMNode } from 'react-dom';
import { width } from 'dom-helpers/query';

export function hover(props, monitor, component) {
  const item = monitor.getItem();
  const { rowId: dragItemId } = item;
  const { rowId: hoverItemId } = props;

  // Hovering over the same item
  if (dragItemId === hoverItemId) {
    return;
  }

  // Sometimes component may be null when it's been unmounted
  if (!component) {
    console.warn(`null component for #${dragItemId}`);
    return;
  }

  // Determine rectangle on screen
  const node = findDOMNode(component);

  item.containerWidth = width(node);

  props.moveRow(
    {itemId: dragItemId},
    {itemId: hoverItemId}
  );
}

export function canDrop(props, monitor) {
  const item = monitor.getItem();

  return item.rowId === props.rowId;
}

export function drop(props) {
  const { rowId: itemId } = props;

  props.dropRow({itemId});
}
