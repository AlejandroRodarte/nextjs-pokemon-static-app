import confetti from 'canvas-confetti';

type BaseImplArgs = {
  add: object;
};

interface BaseConfettiAdapter<ImplArgs extends BaseImplArgs = BaseImplArgs> {
  add(commonArgs: ConfettiAddCommonArgs, implArgs: ImplArgs['add']): void;
}

interface ConfettiImplArgs {
  add: ConfettiAddImplArgs;
}

export interface ConfettiAdapter extends BaseConfettiAdapter<ConfettiImplArgs> {}

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
