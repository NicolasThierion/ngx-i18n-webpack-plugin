"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateExtractor_1 = require("../NgxTranslateExtractor");
var _ = require("lodash");
var ExtractorPlugin_1 = require("./ExtractorPlugin");
var MergerPlugin_1 = require("./MergerPlugin");
var biesbjerg_ngx_translate_extract_1 = require("../biesbjerg-ngx-translate-extract");
var I18nParser_1 = require("../parsers/I18nParser");
/**
 *
 */
var TranslatePlugin;
(function (TranslatePlugin) {
    /**
     * Offers extraction of translations from HTML & JS, when compiling the sources.
     */
    var Extractor = /** @class */ (function () {
        function Extractor(options) {
            if (options === void 0) { options = {}; }
            this.extractor = new ExtractorPlugin_1.ExtractorPlugin(new NgxTranslateExtractor_1.NgxTranslateExtractor(_.defaults({}, {
                patterns: ['/**/*.html', '/**/*.ts', '/**/*.js']
            }, options)), [
                new biesbjerg_ngx_translate_extract_1.PipeParser(),
                new biesbjerg_ngx_translate_extract_1.DirectiveParser(),
                new biesbjerg_ngx_translate_extract_1.ServiceParser(),
                new I18nParser_1.I18nParser()
            ]);
        }
        Extractor.prototype.apply = function (compiler) {
            this.extractor.apply(compiler);
        };
        return Extractor;
    }());
    TranslatePlugin.Extractor = Extractor;
    TranslatePlugin.Merger = MergerPlugin_1.MergerPlugin;
})(TranslatePlugin = exports.TranslatePlugin || (exports.TranslatePlugin = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL25neC10cmFuc2xhdGlvbi13ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esa0VBQWlFO0FBQ2pFLDBCQUE0QjtBQUU1QixxREFBb0Q7QUFDcEQsK0NBQThDO0FBQzlDLHNGQUErRjtBQUMvRixvREFBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxJQUFpQixlQUFlLENBd0MvQjtBQXhDRCxXQUFpQixlQUFlO0lBYzlCOztPQUVHO0lBQ0g7UUFHRSxtQkFBWSxPQUE4QjtZQUE5Qix3QkFBQSxFQUFBLFlBQThCO1lBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpQ0FBZSxDQUNsQyxJQUFJLDZDQUFxQixDQUN2QixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQzthQUNqRCxFQUFFLE9BQU8sQ0FBQyxDQUNaLEVBQUU7Z0JBQ0QsSUFBSSw0Q0FBVSxFQUFFO2dCQUNoQixJQUFJLGlEQUFlLEVBQUU7Z0JBQ3JCLElBQUksK0NBQWEsRUFBRTtnQkFDbkIsSUFBSSx1QkFBVSxFQUFFO2FBQUMsQ0FDcEIsQ0FBQztRQUNKLENBQUM7UUFFRCx5QkFBSyxHQUFMLFVBQU0sUUFBa0I7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEMsQ0FBQztRQUNILGdCQUFDO0lBQUQsQ0FwQkEsQUFvQkMsSUFBQTtJQXBCWSx5QkFBUyxZQW9CckIsQ0FBQTtJQUVZLHNCQUFNLEdBQUcsMkJBQVksQ0FBQztBQUNyQyxDQUFDLEVBeENnQixlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQXdDL0IiLCJmaWxlIjoid2VicGFjay9uZ3gtdHJhbnNsYXRpb24td2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsdWdpbiwgQ29tcGlsZXIgfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZUV4dHJhY3RvciB9IGZyb20gJy4uL05neFRyYW5zbGF0ZUV4dHJhY3Rvcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVNZXJnZXIgfSBmcm9tICcuLi9OZ3hUcmFuc2xhdGVNZXJnZXInO1xuaW1wb3J0IHsgRXh0cmFjdG9yUGx1Z2luIH0gZnJvbSAnLi9FeHRyYWN0b3JQbHVnaW4nO1xuaW1wb3J0IHsgTWVyZ2VyUGx1Z2luIH0gZnJvbSAnLi9NZXJnZXJQbHVnaW4nO1xuaW1wb3J0IHsgRGlyZWN0aXZlUGFyc2VyLCBQaXBlUGFyc2VyLFNlcnZpY2VQYXJzZXIgfSBmcm9tICcuLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IEkxOG5QYXJzZXIgfSBmcm9tICcuLi9wYXJzZXJzL0kxOG5QYXJzZXInO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNsYXRlUGx1Z2luIHtcblxuICBleHBvcnQgaW50ZXJmYWNlIEV4dHJhY3Rvck9wdGlvbnMge1xuICAgIGlucHV0Pzogc3RyaW5nW107ICAgICAgICAgLy8gcGF0aCB0byBzZWFyY2ggZm9yIHRyYW5zbGF0aW9ucyB0byBleHRyYWN0XG4gICAgb3V0cHV0Pzogc3RyaW5nW107ICAgICAgICAvLyB3aGVyZSB0byBzdG9yZSB0cmFuc2xhdGlvbnMgZmlsZXNcbiAgICBmb3JtYXQ/OiAnanNvbicgfCAncG8nLCAgIC8vIG91dHB1dCBmb3JtYXRcbiAgICByZWxhdGl2ZU91dHB1dD86IGJvb2xlYW47IC8vIGlmIHNldCB0byB0cnVlLCBvdXRwdXQgcmVsYXRpdmUgdG8gZmlsZXMgd2hlcmUgdHJhbnNsYXRpb25zIGhhdmUgYmVlbiBleHRyYWN0ZWRcbiAgICBsYW5ndWFnZXM/OiBzdHJpbmdbXTsgICAgIC8vIGZvciB3aGljaCBsYW5ndWFnZXMgc2hvdWxkIGdlbmVyYXRlIGZpbGVzID9cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWVyZ2VyT3B0aW9ucyBleHRlbmRzIE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zIHtcbiAgICBlbWl0T25seT86IGJvb2xlYW47XG4gIH1cblxuICAvKipcbiAgICogT2ZmZXJzIGV4dHJhY3Rpb24gb2YgdHJhbnNsYXRpb25zIGZyb20gSFRNTCAmIEpTLCB3aGVuIGNvbXBpbGluZyB0aGUgc291cmNlcy5cbiAgICovXG4gIGV4cG9ydCBjbGFzcyBFeHRyYWN0b3IgaW1wbGVtZW50cyBQbHVnaW4ge1xuICAgIHB1YmxpYyBleHRyYWN0b3I6IFBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEV4dHJhY3Rvck9wdGlvbnMgPSB7fSkge1xuICAgICAgdGhpcy5leHRyYWN0b3IgPSBuZXcgRXh0cmFjdG9yUGx1Z2luKFxuICAgICAgICBuZXcgTmd4VHJhbnNsYXRlRXh0cmFjdG9yKFxuICAgICAgICAgIF8uZGVmYXVsdHMoe30sIHtcbiAgICAgICAgICAgIHBhdHRlcm5zOiBbJy8qKi8qLmh0bWwnLCAnLyoqLyoudHMnLCAnLyoqLyouanMnXVxuICAgICAgICAgIH0sIG9wdGlvbnMpLFxuICAgICAgICApLCBbXG4gICAgICAgICAgbmV3IFBpcGVQYXJzZXIoKSxcbiAgICAgICAgICBuZXcgRGlyZWN0aXZlUGFyc2VyKCksXG4gICAgICAgICAgbmV3IFNlcnZpY2VQYXJzZXIoKSxcbiAgICAgICAgICBuZXcgSTE4blBhcnNlcigpXVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuZXh0cmFjdG9yLmFwcGx5KGNvbXBpbGVyKVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBNZXJnZXIgPSBNZXJnZXJQbHVnaW47XG59XG5cbiJdfQ==
