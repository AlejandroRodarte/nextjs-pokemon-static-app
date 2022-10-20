import {
  AddManyWithTimersArgs,
  AddOneArgs,
  confettiService,
} from '../../../services/client/confetti.service';

export const addConfettiOnFavorite = (): void => {
  const addOneArgs: AddOneArgs = {
    shape: 'circle',
    origin: {
      x: 1,
      y: 0,
    },
    color: 'blue',
  };
  const timers: number[] = [0, 50, 100];

  const sequence: AddManyWithTimersArgs = timers.map((ms) => ({
    ...addOneArgs,
    ms,
  }));

  confettiService.addManyWithIntervals(sequence);
};
