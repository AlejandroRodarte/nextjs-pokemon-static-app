import confetti from 'canvas-confetti';

import { AddArgs } from '../../interfaces/adapters/confetti-adapter.interface';
import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';

export class CanvasConfettiAdapter implements ConfettiAdapter {
  add(args: AddArgs): void {
    confetti(args.implData.args.options);
  }
}

export const canvasConfettiAdapter = new CanvasConfettiAdapter();
