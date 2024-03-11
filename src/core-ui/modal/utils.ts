export function getVariantClass(currentVariant: string) {
  let result = '';
  switch (currentVariant) {
    case 'center':
      result = 'abc-modal--center';
      break;
    case 'fullscreen':
      result = 'abc-modal--fullscreen';
      break;
    case 'scrollable':
      result = 'abc-modal--scrollable';
      break;
    case 'scrollable-fullheight':
      result = 'abc-modal--scrollable-fullheight';
      break;
    default:
      result = 'abc-modal--top';
  }
  return result;
}

export function setRootClass(value: boolean) {
  const root = document.getElementsByTagName('html')[0];
  if (value) {
    root.classList.add('modal-opened');
    root.style.overflow = 'hidden';
    root.style.paddingRight = '8px';
  } else {
    root.classList.remove('modal-opened');
    root.style.overflow = 'auto';
    root.style.paddingRight = '';
  }
}
