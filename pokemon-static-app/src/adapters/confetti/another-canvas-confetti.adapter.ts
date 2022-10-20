import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';
import {
  ConfettiAddCommonArgs,
  ConfettiAddImplArgs,
} from '../../interfaces/adapters/confetti-adapter.interface';

export class AnotherCanvasConfettiAdapter implements ConfettiAdapter {
  add(commonArgs: ConfettiAddCommonArgs, implArgs: ConfettiAddImplArgs): void {
    console.log(commonArgs.shape, implArgs.anotherCanvasConfetti?.options);
  }
}

export const anotherCanvasConfettiAdapter = new AnotherCanvasConfettiAdapter();
