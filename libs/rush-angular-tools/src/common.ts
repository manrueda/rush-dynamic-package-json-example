import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { JsonObject } from '@angular-devkit/core';
import { BuilderContext, BuilderRun } from '@angular-devkit/architect';

export async function rushSafeBuilder<T extends JsonObject>(context: BuilderContext, builder: string, options: T): Promise<BuilderRun> {
   let oldWrite: any;
   return Promise.resolve()
   .then(() => {
      oldWrite = process.stderr.write;
      process.stderr.write = function (str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error) => void) {
         return process.stdout.write(str, encoding, cb);
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
   })
   .then(() => context.scheduleBuilder(builder, options))
   .then((out) => {
      out.output.toPromise().finally(() => {
         process.stderr.write = oldWrite
         oldWrite = undefined;
      });
      return out;
   });
}

export function findRushRoot(dir: string): string {
   const files = readdirSync(dir);
   if (files.includes('rush.json')) {
      return dir;
   }

   return findRushRoot(resolve(dir, '..'));
}