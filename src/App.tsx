import { z } from "zod/v4";

const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

export const App = () => {
  const ivp = {};
  try {
    Player.parse(ivp);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues);
      /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */
    }
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-9 bg-[red]">CANVAS</div>
      <div className="col-span-3 bg-[green]">CONTROL PANEL</div>
    </div>
  );
};
