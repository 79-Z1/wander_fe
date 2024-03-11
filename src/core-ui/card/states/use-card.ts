import {useContext} from 'react';

import {Context} from './context';

export function useCardState() {
  const context = useContext(Context);
  if (context === undefined) throw new Error('useCardState must be used within a card provider');
  return context;
}
