import confetti from 'canvas-confetti';

export interface ConfettiAdapter {
  add(commonArgs: ConfettiAddCommonArgs, implArgs: ConfettiAddImplArgs): void;
}

/**
 * add() common and implementation-specific args
 */
export interface ConfettiAddCommonArgs {
  shape: 'square' | 'circle';
}

export interface ConfettiAddImplArgs {
  anotherCanvasConfetti?: AnotherCanvasConfettiAddArgs;
  canvasConfetti?: CanvasConfettiAddArgs;
}

export interface AnotherCanvasConfettiAddArgs {
  options: {
    timeout: number;
  };
}

export interface CanvasConfettiAddArgs {
  options: confetti.Options;
}
