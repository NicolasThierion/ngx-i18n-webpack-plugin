import { Plugin, Compiler } from 'webpack';
import { NgxTranslateExtractor } from '../NgxTranslateExtractor';
import * as _ from 'lodash';
import { NgxTranslateMerger } from '../NgxTranslateMerger';
import { ExtractorPlugin } from './ExtractorPlugin';
import { MergerPlugin } from './MergerPlugin';
import { DirectiveParser, PipeParser,ServiceParser } from '../biesbjerg-ngx-translate-extract';
import { I18nParser } from '../parsers/I18nParser';

/**
 *
 */
export namespace TranslatePlugin {

  export interface ExtractorOptions {
    input?: string[];         // path to search for translations to extract
    output?: string[];        // where to store translations files
    format?: 'json' | 'po',   // output format
    relativeOutput?: boolean; // if set to true, output relative to files where translations have been extracted
    languages?: string[];     // for which languages should generate files ?
  }

  export interface MergerOptions extends NgxTranslateMerger.MergerOptions {
    emitOnly?: boolean;
  }

  /**
   * Offers extraction of translations from HTML & JS, when compiling the sources.
   */
  export class Extractor implements Plugin {
    public extractor: Plugin;

    constructor(options: ExtractorOptions = {}) {
      this.extractor = new ExtractorPlugin(
        new NgxTranslateExtractor(
          _.defaults({}, {
            patterns: ['/**/*.html', '/**/*.ts', '/**/*.js']
          }, options),
        ), [
          new PipeParser(),
          new DirectiveParser(),
          new ServiceParser(),
          new I18nParser()]
      );
    }

    apply(compiler: Compiler): void {
      this.extractor.apply(compiler)
    }
  }

  export const Merger = MergerPlugin;
}

