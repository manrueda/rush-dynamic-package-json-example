import { dirname } from 'path';
import { RushConfiguration, PackageJsonEditor } from '@microsoft/rush-lib';

export function replaceWorkspaceVersion(packageJsonPath: string) {
   const config = RushConfiguration.loadFromDefaultLocation({ startingFolder: dirname(packageJsonPath) });
   const pkg = PackageJsonEditor.load(packageJsonPath);
   console.log(pkg.dependencyList)
   for (const dep of pkg.dependencyList) {
      if (dep.version === 'workspace:*') {
         const depProject = config.projectsByName.get(dep.name);
         if (depProject) {
            dep.setVersion(depProject.packageJsonEditor.version);
         } else {
            throw new Error(`The package ${dep.name} is not part of the Rush monorepository`);
         }
      }
   }
   pkg.saveIfModified();
}