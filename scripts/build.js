import * as esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

function createBuildSettings() {
  return {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.cjs',
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node20',
    plugins: [
      esbuildPluginTsc({
        force: true,
      }),
    ],
  };
}

const settings = createBuildSettings();

esbuild.build(settings);
