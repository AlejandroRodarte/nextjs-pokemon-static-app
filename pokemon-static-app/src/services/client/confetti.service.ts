import { canvasConfettiAdapter } from '../../adapters/confetti/canvas-confetti.adapter';
import {
  ConfettiImplName,
  ConfettiAddArgs,
} from '../../interfaces/adapters/confetti-adapter.interface';

import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';

export class ConfettiService<ImplName extends ConfettiImplName> {
  private readonly implName: ImplName;
  private readonly confetti: ConfettiAdapter;

  constructor(implName: ImplName, confetti: ConfettiAdapter) {
    this.implName = implName;
    this.confetti = confetti;
  }

  addOne(implArgs: ConfettiAddArgs[ImplName]) {
    this.confetti.add({ implData: { type: this.implName, args: implArgs } });
  }
}

export const confettiService = new ConfettiService(
  'canvas-confetti',
  canvasConfettiAdapter
);
