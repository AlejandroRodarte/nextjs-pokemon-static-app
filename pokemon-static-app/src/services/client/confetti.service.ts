import { AddImplArgs } from '../../interfaces/adapters/confetti-adapter.interface';
import { canvasConfettiAdapter } from '../../adapters/confetti/canvas-confetti.adapter';
import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';

interface AddOneArgs {
  common: {
    add: {
      shape: 'square' | 'circle';
    };
  };
  impl: {
    add: AddImplArgs;
  };
}

export class ConfettiService {
  private readonly confetti: ConfettiAdapter;

  constructor(confetti: ConfettiAdapter) {
    this.confetti = confetti;
  }

  addOne(args: AddOneArgs) {
    this.confetti.add(args.common.add, args.impl.add);
  }
}

export const confettiService = new ConfettiService(canvasConfettiAdapter);
