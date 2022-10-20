import confetti from 'canvas-confetti';

export type ConfettiImplName = 'canvas-confetti';

export interface ConfettiAdapter {
  add(commonArgs: AddCommonArgs, implArgs: AddImplArgs): void;
}

export interface AddCommonArgs {
  shape: 'square' | 'circle';
}

export interface AddImplArgs {
  canvasConfetti?: CanvasConfettiAddArgs;
}

export interface CanvasConfettiAddArgs {
  options: confetti.Options;
}
