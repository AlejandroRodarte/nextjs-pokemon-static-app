import confetti from 'canvas-confetti';

export type ConfettiImplName = 'canvas-confetti';

export interface ConfettiAdapter {
  add(args: AddArgs): void;
}

/**
 * add() method third-library-specific args
 */
export interface AddArgs {
  implData: AddArgsImplData;
}

export type AddArgsImplData = CanvasConfettiAddData;

export interface CanvasConfettiAddData {
  type: 'canvas-confetti';
  args: CanvasConfettiAddArgs;
}

export interface CanvasConfettiAddArgs {
  options: confetti.Options;
}

export interface ConfettiAddArgs {
  'canvas-confetti': CanvasConfettiAddArgs;
}
