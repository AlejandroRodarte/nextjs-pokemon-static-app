import confetti from 'canvas-confetti';

/**
 * base confetti adapter and common method args: can be imported from a library
 */
interface BaseConfettiAdapter<ImplArgs extends BaseImplArgs = BaseImplArgs> {
  add(commonArgs: ConfettiAddCommonArgs, implArgs: ImplArgs['add']): void;
}

type BaseImplArgs = {
  add: object;
};

export interface ConfettiAddCommonArgs {
  shape: 'square' | 'circle';
}

/**
 * app-specific confetti adapter: uses impl-specific args
 */
export interface ConfettiAdapter
  extends BaseConfettiAdapter<ConfettiImplArgs> {}

interface ConfettiImplArgs {
  add: ConfettiAddImplArgs;
}

/**
 * add() impl-specific args for 'another-canvas-confetti' and 'canvas-confetti'
 */
export interface ConfettiAddImplArgs {
  anotherCanvasConfetti?: AnotherCanvasConfettiAddArgs;
  canvasConfetti?: CanvasConfettiAddArgs;
}

export interface AnotherCanvasConfettiAddArgs {
  options: {
    color: string;
  };
}

export interface CanvasConfettiAddArgs {
  options: confetti.Options;
}
