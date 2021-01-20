import { resolve } from 'path';
import { BuilderContext, createBuilder, BuilderOutput } from '@angular-devkit/architect';
import {
   NgPackagrBuilderOptions,
   executeNgPackagrBuilder as _executeNgPackagrBuilder,
} from '@angular-devkit/build-angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { rushSafeBuilder } from '../common';
import { replaceWorkspaceVersion } from '../rush-package-json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createBuilder(executeNgPackagrBuilder as any);

/**
 * Wrapper of executeNgPackagrBuilder
 * @public
 */
export function executeNgPackagrBuilder(
   options: NgPackagrBuilderOptions,
   context: BuilderContext,
): Observable<BuilderOutput> {
   return from(rushSafeBuilder(context, '@angular-devkit/build-angular:ng-packagr', options as any)).pipe(
      switchMap(out => out.result),
      switchMap(async result => {
         const ngPackagrPath = resolve(context.workspaceRoot, options.project);
         const ngPackagr = await import(ngPackagrPath);
         replaceWorkspaceVersion(resolve(ngPackagr.dest, 'package.json'));
         return result;
      })
   );
}
