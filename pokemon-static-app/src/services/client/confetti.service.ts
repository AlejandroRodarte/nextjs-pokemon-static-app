import { canvasConfettiAdapter } from '../../adapters/confetti/canvas-confetti.adapter';
import { ConfettiAdapter } from '../../interfaces/adapters/confetti-adapter.interface';
import { wait } from '../../helpers/time';

export interface AddOneArgs {
  shape: 'square' | 'circle';
  origin: {
    x: number;
    y: number;
  };
  color: string;
}

export type AddManySimultaneousArgs = AddOneArgs[];
export type AddOneWithTimer = AddOneArgs & { ms: number };
export type AddManyWithTimersArgs = AddOneWithTimer[];

export class ConfettiService {
  private readonly confetti: ConfettiAdapter;

  constructor(confetti: ConfettiAdapter) {
    this.confetti = confetti;
  }

  addOne(args: AddOneArgs): void {
    const { shape, origin, color } = args;
    this.confetti.add(
      { shape },
      {
        canvasConfetti: {
          options: {
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin,
          },
        },
        anotherCanvasConfetti: {
          options: {
            color,
          },
        },
      }
    );
  }

  addManySimultaneous(args: AddManySimultaneousArgs): void {
    args.forEach((addOneArgs) => this.addOne(addOneArgs));
  }

  async addManyWithIntervals(args: AddManyWithTimersArgs): Promise<void> {
    for (const addOneWithTimer of args) {
      const { ms, ...addOneArgs } = addOneWithTimer;
      const timeoutId = await wait(ms);
      if (timeoutId) clearTimeout(timeoutId);
      this.addOne(addOneArgs);
    }
  }
}

export const confettiService = new ConfettiService(canvasConfettiAdapter);
