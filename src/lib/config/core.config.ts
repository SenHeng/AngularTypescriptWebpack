import { ICompileProvider } from 'angular';

export function config(
  $compileProvider: ICompileProvider
) {
  // disable debug info to speed up app
  $compileProvider.debugInfoEnabled(false);
}

config.$inject = ['$compileProvider'];
