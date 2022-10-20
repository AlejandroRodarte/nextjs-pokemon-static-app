import { canvasConfettiAdapter } from '../../adapters/confetti/canvas-confetti.adapter';
import {
  ConfettiAdapter,
  ConfettiAddImplArgs,
} from '../../interfaces/adapters/confetti-adapter.interface';

interface AddOneArgs {
  shape: 'square' | 'circle';
  implArgs: ConfettiAddImplArgs;
}

export class ConfettiService {
  private readonly confetti: ConfettiAdapter;

  constructor(confetti: ConfettiAdapter) {
    this.confetti = confetti;
  }

  addOne(args: AddOneArgs): void {
    const { shape, implArgs } = args;
    this.confetti.add({ shape }, implArgs);
  }
}

export const confettiService = new ConfettiService(canvasConfettiAdapter);
