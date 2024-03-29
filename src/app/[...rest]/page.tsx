import {Container} from '@/core-ui';

import NotFoundModule from '@/modules/not-found/not-found';

export default function CatchAllPage() {
  return (
    <Container className="h-full">
      <NotFoundModule />
    </Container>
  );
}
