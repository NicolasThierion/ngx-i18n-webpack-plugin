"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var _ = require("lodash");
var PATH = require("path");
var utils_1 = require("./utils");
var fs = require("fs");
var I18nParser_1 = require("./parsers/I18nParser");
var compiler_factory_1 = require("./compiler.factory");
var ExtendedTranslationCollection_1 = require("./ExtendedTranslationCollection");
/**
 * Wrapper for ExtractTask without going through the provided cli.
 */
var NgxTranslateExtractor = /** @class */ (function () {
    function NgxTranslateExtractor(options) {
        if (options === void 0) { options = {}; }
        this.options = _.defaults(options, {
            clean: true,
            replace: false,
            sort: false,
            patterns: ['/**/*.html', '/**/*.ts'],
            input: ['./src'],
            output: ['./i18n'],
            relative: true,
            languages: ['en'],
            format: 'po' // gettext format
        });
        Object.seal(this.options);
        if (this.options.format !== 'po' && this.options.format !== 'json') {
            throw new TypeError("invalid format : " + options.format + ". Valid format are json, po");
        }
        this.setParsers([
            new biesbjerg_ngx_translate_extract_1.PipeParser(),
            new biesbjerg_ngx_translate_extract_1.DirectiveParser(),
            new biesbjerg_ngx_translate_extract_1.ServiceParser(),
            new I18nParser_1.I18nParser()
        ]);
        this._compiler = compiler_factory_1.CompilerFactory.create(this.options.format, {});
    }
    NgxTranslateExtractor.prototype.setParsers = function (parsers) {
        this._parsers = parsers;
    };
    NgxTranslateExtractor.prototype.execute = function (filenames) {
        var _this = this;
        var o = this.options;
        var input = filenames ? filenames
            .map(function (f) { return fs.statSync(f).isFile() ? PATH.dirname(f) : f; })
            : o.input;
        // if output specified, run ExtractTask as normal
        if (!this.options.relativeOutput) {
            // ngx-translate-extract --input  `input` --output `output` --clean --sort --format namespaced-json
            var collections = this._extract(input, o);
            this._save(collections, o.output.map(function (ot) { return PATH.join(ot, "[lang].[ext]"); }));
        }
        else {
            // list all files found that matches template
            var dirs_1 = new Set();
            input.map(function (dir) {
                return utils_1.readDir(dir, o.patterns)
                    .map(PATH.dirname)
                    .reduce(function (dirs, dir) {
                    return dirs.add(dir);
                }, dirs_1);
            });
            // run one extractTask per folder where template is found
            dirs_1.forEach(function (dir) {
                var collections = _this._extract([dir], {
                    patterns: o.patterns.map(function (p) { return "/" + PATH.basename(p); })
                });
                _this._save(collections, o.output.map(function (ot) { return PATH.join(dir, ot, PATH.basename(dir) + ".[lang].[ext]"); }));
            });
        }
    };
    /**
     * Extract strings from input dirs using configured parsers
     */
    NgxTranslateExtractor.prototype._extract = function (input, options) {
        var _this = this;
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
        input.forEach(function (dir) {
            utils_1.readDir(dir, options.patterns || []).forEach(function (path) {
                var contents = fs.readFileSync(path, 'utf-8');
                _this._parsers.forEach(function (parser) {
                    collection = collection.union(parser.extract(contents, path));
                });
            });
        });
        var collections = {};
        this.options.languages.forEach(function (l) {
            collections[l] = collection;
        });
        return collections;
    };
    NgxTranslateExtractor.prototype._save = function (collections, outputs) {
        var _this = this;
        var _loop_1 = function (lang) {
            var normalizedOutputs = outputs.map(function (ot) { return utils_1.normalizePath(ot, _this._compiler.extension, lang); });
            normalizedOutputs.forEach(function (o) {
                var collection = intersect(o, _this._compiler, collections[lang]);
                utils_1.save(collection, lang, _this.options.format, o);
            });
        };
        for (var _i = 0, _a = Object.keys(collections); _i < _a.length; _i++) {
            var lang = _a[_i];
            _loop_1(lang);
        }
    };
    return NgxTranslateExtractor;
}());
exports.NgxTranslateExtractor = NgxTranslateExtractor;
function intersect(path, compiler, collection) {
    if (collection === void 0) { collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection(); }
    var res = collection;
    if (PATH.extname(path) !== "." + compiler.extension) {
        return res;
    }
    if (!fs.existsSync(path)) {
        return res;
    }
    res = ExtendedTranslationCollection_1.ExtendedTranslationCollection.of(compiler.parse(fs.readFileSync(path, 'utf-8')));
    res = collection.union(res).intersect(collection);
    return res;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVFeHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRkFJMEM7QUFDMUMsMEJBQTRCO0FBQzVCLDJCQUE2QjtBQUM3QixpQ0FBdUQ7QUFDdkQsdUJBQXlCO0FBQ3pCLG1EQUFrRDtBQUVsRCx1REFBcUQ7QUFDckQsaUZBQWdGO0FBVWhGOztHQUVHO0FBQ0g7SUFLRSwrQkFBWSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLFlBQXdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQWdCLGlCQUFpQjtTQUM5QyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFvQixPQUFPLENBQUMsTUFBTSxnQ0FBNkIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osSUFBSSw0Q0FBVSxFQUFFO1lBQ2hCLElBQUksaURBQWUsRUFBRTtZQUNyQixJQUFJLCtDQUFhLEVBQUU7WUFDbkIs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WyJpbXBvcnQge1xuICBEaXJlY3RpdmVQYXJzZXIsIEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSxcbiAgUGFyc2VySW50ZXJmYWNlLCBQaXBlUGFyc2VyLFxuICBTZXJ2aWNlUGFyc2VyXG59IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIFBBVEggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBub3JtYWxpemVQYXRoLCByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBJMThuUGFyc2VyIH0gZnJvbSAnLi9wYXJzZXJzL0kxOG5QYXJzZXInO1xuaW1wb3J0IHsgQ29tcGlsZXJJbnRlcmZhY2UgfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuaW1wb3J0IHsgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuL0V4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBOZ3hPcHRpb25zIGV4dGVuZHMgRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlIHtcbiAgaW5wdXQ/OiBzdHJpbmdbXTtcbiAgb3V0cHV0Pzogc3RyaW5nW107XG4gIHJlbGF0aXZlT3V0cHV0PzogYm9vbGVhbjtcbiAgZm9ybWF0PzogJ3BvJyB8ICdqc29uJyxcbiAgbGFuZ3VhZ2VzPzogWydlbiddXG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgRXh0cmFjdFRhc2sgd2l0aG91dCBnb2luZyB0aHJvdWdoIHRoZSBwcm92aWRlZCBjbGkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3Ige1xuICBfcGFyc2VyczogUGFyc2VySW50ZXJmYWNlW107XG4gIF9jb21waWxlcjogQ29tcGlsZXJJbnRlcmZhY2U7XG4gIG9wdGlvbnM6IE5neE9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTmd4T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICBjbGVhbjogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBvYnNvbGV0ZSBzdHJpbmdzIHdoZW4gbWVyZ2luZ1xuICAgICAgcmVwbGFjZTogZmFsc2UsICAgICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb250ZW50cyBvZiBvdXRwdXQgZmlsZSBpZiBpdCBleGlzdHNcbiAgICAgIHNvcnQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy8gU29ydCBzdHJpbmdzIGluIGFscGhhYmV0aWNhbCBvcmRlciB3aGVuIHNhdmluZ1xuICAgICAgcGF0dGVybnM6IFsnLyoqLyouaHRtbCcsICcvKiovKi50cyddLCAgICAvLyBFeHRyYWN0IHN0cmluZ3MgZnJvbSB0aGUgZm9sbG93aW5nIGZpbGUgcGF0dGVybnNcbiAgICAgIGlucHV0OiBbJy4vc3JjJ10sXG4gICAgICBvdXRwdXQ6IFsnLi9pMThuJ10sXG4gICAgICByZWxhdGl2ZTogdHJ1ZSxcbiAgICAgIGxhbmd1YWdlczogWydlbiddLFxuICAgICAgZm9ybWF0OiAncG8nICAgICAgICAgICAgICAgIC8vIGdldHRleHQgZm9ybWF0XG4gICAgfSk7XG4gICAgT2JqZWN0LnNlYWwodGhpcy5vcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSAncG8nICYmIHRoaXMub3B0aW9ucy5mb3JtYXQgIT09ICdqc29uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmb3JtYXQgOiAke29wdGlvbnMuZm9ybWF0fS4gVmFsaWQgZm9ybWF0IGFyZSBqc29uLCBwb2ApO1xuICAgIH1cbiAgICB0aGlzLnNldFBhcnNlcnMoW1xuICAgICAgICBuZXcgUGlwZVBhcnNlcigpLFxuICAgICAgICBuZXcgRGlyZWN0aXZlUGFyc2VyKCksXG4gICAgICAgIG5ldyBTZXJ2aWNlUGFyc2VyKCksXG4gICAgICAgIG5ldyBJMThuUGFyc2VyKClcbiAgICBdKTtcbiAgICB0aGlzLl9jb21waWxlciA9IENvbXBpbGVyRmFjdG9yeS5jcmVhdGUodGhpcy5vcHRpb25zLmZvcm1hdCwge30pXG4gIH1cblxuICBzZXRQYXJzZXJzKHBhcnNlcnM6IFBhcnNlckludGVyZmFjZVtdKSB7XG4gICAgICB0aGlzLl9wYXJzZXJzID0gcGFyc2VycztcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlKGZpbGVuYW1lcz86IHN0cmluZ1tdKSB7XG5cbiAgICBjb25zdCBvID0gdGhpcy5vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBpbnB1dCA9IGZpbGVuYW1lcyA/IGZpbGVuYW1lc1xuICAgICAgICAubWFwKGYgPT4gZnMuc3RhdFN5bmMoZikuaXNGaWxlKCkgPyBQQVRILmRpcm5hbWUoZikgOiBmKVxuICAgICAgOiBvLmlucHV0O1xuXG4gICAgLy8gaWYgb3V0cHV0IHNwZWNpZmllZCwgcnVuIEV4dHJhY3RUYXNrIGFzIG5vcm1hbFxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbGF0aXZlT3V0cHV0KSB7XG4gICAgICAvLyBuZ3gtdHJhbnNsYXRlLWV4dHJhY3QgLS1pbnB1dCAgYGlucHV0YCAtLW91dHB1dCBgb3V0cHV0YCAtLWNsZWFuIC0tc29ydCAtLWZvcm1hdCBuYW1lc3BhY2VkLWpzb25cbiAgICAgIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuX2V4dHJhY3QoaW5wdXQsIG8pO1xuICAgICAgdGhpcy5fc2F2ZShjb2xsZWN0aW9ucywgby5vdXRwdXQubWFwKG90ID0+IFBBVEguam9pbihvdCwgYFtsYW5nXS5bZXh0XWApKSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gbGlzdCBhbGwgZmlsZXMgZm91bmQgdGhhdCBtYXRjaGVzIHRlbXBsYXRlXG4gICAgICBjb25zdCBkaXJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBpbnB1dC5tYXAoZGlyID0+IHtcbiAgICAgICAgcmV0dXJuIHJlYWREaXIoZGlyLCBvLnBhdHRlcm5zKVxuICAgICAgICAgIC5tYXAoUEFUSC5kaXJuYW1lKVxuICAgICAgICAgIC5yZWR1Y2UoKGRpcnM6IFNldDxzdHJpbmc+LCBkaXI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpcnMuYWRkKGRpcik7XG4gICAgICAgICAgfSwgZGlycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gcnVuIG9uZSBleHRyYWN0VGFzayBwZXIgZm9sZGVyIHdoZXJlIHRlbXBsYXRlIGlzIGZvdW5kXG4gICAgICBkaXJzLmZvckVhY2goZGlyID0+IHtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25zID0gdGhpcy5fZXh0cmFjdChbZGlyXSwge1xuICAgICAgICAgIHBhdHRlcm5zOiBvLnBhdHRlcm5zLm1hcChwID0+IGAvJHtQQVRILmJhc2VuYW1lKHApfWApXG4gICAgICAgIH0pO1xuICAgICAgIHRoaXMuX3NhdmUoY29sbGVjdGlvbnMsIG8ub3V0cHV0Lm1hcChvdCA9PiBQQVRILmpvaW4oZGlyLCBvdCwgYCR7UEFUSC5iYXNlbmFtZShkaXIpfS5bbGFuZ10uW2V4dF1gKSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3Qgc3RyaW5ncyBmcm9tIGlucHV0IGRpcnMgdXNpbmcgY29uZmlndXJlZCBwYXJzZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2V4dHJhY3QoaW5wdXQ6IHN0cmluZ1tdLCBvcHRpb25zOiBFeHRyYWN0VGFza09wdGlvbnNJbnRlcmZhY2UpOiB7W2xhbmc6c3RyaW5nXTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb259IHtcbiAgICBsZXQgY29sbGVjdGlvbiA9IG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbigpO1xuICAgIGlucHV0LmZvckVhY2goZGlyID0+IHtcbiAgICAgIHJlYWREaXIoZGlyLCBvcHRpb25zLnBhdHRlcm5zIHx8IFtdKS5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50czogc3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsICd1dGYtOCcpO1xuICAgICAgICB0aGlzLl9wYXJzZXJzLmZvckVhY2goKHBhcnNlcjogUGFyc2VySW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24udW5pb24ocGFyc2VyLmV4dHJhY3QoY29udGVudHMsIHBhdGgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge307XG4gICAgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmxhbmd1YWdlcy5mb3JFYWNoKGwgPT4ge1xuICAgICAgY29sbGVjdGlvbnNbbF0gPSBjb2xsZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2F2ZShjb2xsZWN0aW9uczoge1tsYW5nOiBzdHJpbmddOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbn0sIG91dHB1dHM6IHN0cmluZ1tdKTogYW55IHtcblxuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyhjb2xsZWN0aW9ucykpIHtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZE91dHB1dHMgPSBvdXRwdXRzLm1hcChvdCA9PiBub3JtYWxpemVQYXRoKG90LCB0aGlzLl9jb21waWxlci5leHRlbnNpb24sIGxhbmcpKTtcbiAgICAgIG5vcm1hbGl6ZWRPdXRwdXRzLmZvckVhY2gobyA9PiB7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBpbnRlcnNlY3QobywgdGhpcy5fY29tcGlsZXIsIGNvbGxlY3Rpb25zW2xhbmddKTtcbiAgICAgICAgc2F2ZShjb2xsZWN0aW9uLCBsYW5nLCAodGhpcy5vcHRpb25zIGFzIGFueSkuZm9ybWF0LCBvKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdChwYXRoOiBzdHJpbmcsIGNvbXBpbGVyOiBDb21waWxlckludGVyZmFjZSxcbiAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKCkpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gIGxldCByZXMgPSBjb2xsZWN0aW9uO1xuXG4gIGlmIChQQVRILmV4dG5hbWUocGF0aCkgIT09IGAuJHtjb21waWxlci5leHRlbnNpb259YCkge1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICByZXMgPSBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbi5vZihjb21waWxlci5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JykpKTtcbiAgcmVzID0gY29sbGVjdGlvbi51bmlvbihyZXMpLmludGVyc2VjdChjb2xsZWN0aW9uKTtcbiAgcmV0dXJuIHJlcztcbn1cbiJdfQ==
