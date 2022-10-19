import { ActionProps } from '../../../interfaces/contexts/action-props.interface';
import { TEST_ACTION } from '../favorites.action-types';

interface Payload {
  flag: boolean;
}

export class TestAction implements ActionProps<typeof TEST_ACTION, Payload> {
  readonly type: typeof TEST_ACTION = TEST_ACTION;
  readonly payload: Payload;

  constructor(flag: boolean) {
    this.payload = {
      flag,
    };
  }
}
