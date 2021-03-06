import * as globToRegExp from 'glob-to-regexp'
import { Compiler, Plugin } from 'webpack';
import { NgxTranslateExtractor } from '../NgxTranslateExtractor';
import { readDir } from '../utils';
import { ParserInterface } from '../biesbjerg-ngx-translate-extract';

/**
 * Webpack plugin that extracts translation from any file, using NgxTranslateExtractor.
 */
export class ExtractorPlugin implements Plugin {
  private extractor: NgxTranslateExtractor;
  private compiled: boolean;
  private fileTimestamps = {};

  constructor(extractor: NgxTranslateExtractor, parsers?: ParserInterface[]) {
    this.extractor = extractor;
    if (parsers) {
      this.extractor.setParsers(parsers);
    }
  }

  apply(compiler: Compiler) {
    compiler.plugin('compile', (compilation) => {
      if (!this.compiled) {
        this.extractor.execute();
      }
      this.compiled = true;
    });

    compiler.plugin('emit', (compilation, done) => {

      // filter changed files to only keep those which can contain new translations.
      const changedFiles = Object.keys(compilation.fileTimestamps)
        .filter(watchfile => (this.fileTimestamps[watchfile] || Infinity) < (compilation.fileTimestamps[watchfile] || Infinity))
        .filter(f => {
          return (this.extractor.options.patterns || [])
            .map(globToRegExp)
            .map(r => !!f.match(r as string))
            .reduce((acc, v) => acc || v, false)
        });

      // update file change timestamp
      this.fileTimestamps = compilation.fileTimestamps;

      // trigger new extraction
      if (changedFiles.length) {
        this.extractor.execute(changedFiles);
      }

      // watch newly created files
      const o = this.extractor.options as any;
      const extractedFiles = o.input.reduce((inputs, i) => {
        return inputs.concat(readDir(i, [`**/*.${o.format}`]))
      }, []);
      compilation.fileDependencies = compilation.fileDependencies.concat(extractedFiles);

      done()
    });
  }
}
