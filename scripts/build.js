import * as esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

function createBuildSettings() {
  return {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    plugins: [
      esbuildPluginTsc({
        force: true,
      }),
    ],
  };
}

const settings = createBuildSettings();

esbuild.build(settings);
