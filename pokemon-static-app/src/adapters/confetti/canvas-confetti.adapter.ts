import confetti from 'canvas-confetti';

import {
  ConfettiAddCommonArgs,
  ConfettiAddImplArgs,
} from '../../interfaces/adapters/confetti-adapter.interface';
import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';

export class CanvasConfettiAdapter implements ConfettiAdapter {
  add(commonArgs: ConfettiAddCommonArgs, implArgs: ConfettiAddImplArgs): void {
    confetti({
      ...implArgs.canvasConfetti?.options,
      shapes: [commonArgs.shape],
    });
  }
}

export const canvasConfettiAdapter = new CanvasConfettiAdapter();
