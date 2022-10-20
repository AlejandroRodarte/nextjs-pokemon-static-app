import confetti from 'canvas-confetti';

import {
  AddCommonArgs,
  AddImplArgs,
} from '../../interfaces/adapters/confetti-adapter.interface';
import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';

export class CanvasConfettiAdapter implements ConfettiAdapter {
  add(commonArgs: AddCommonArgs, implArgs: AddImplArgs): void {
    confetti({
      ...implArgs.canvasConfetti?.options,
      shapes: [commonArgs.shape],
    });
  }
}

export const canvasConfettiAdapter = new CanvasConfettiAdapter();
