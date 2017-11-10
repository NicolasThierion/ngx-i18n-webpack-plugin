"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globToRegExp = require("glob-to-regexp");
var utils_1 = require("../utils");
/**
 * Webpack plugin that extracts translation from any file, using NgxTranslateExtractor.
 */
var ExtractorPlugin = /** @class */ (function () {
    function ExtractorPlugin(extractor, parsers) {
        this.fileTimestamps = {};
        this.extractor = extractor;
        if (parsers) {
            this.extractor.setParsers(parsers);
        }
    }
    ExtractorPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.plugin('compile', function (compilation) {
            if (!_this.compiled) {
                _this.extractor.execute();
            }
            _this.compiled = true;
        });
        compiler.plugin('emit', function (compilation, done) {
            // filter changed files to only keep those which can contain new translations.
            var changedFiles = Object.keys(compilation.fileTimestamps)
                .filter(function (watchfile) { return (_this.fileTimestamps[watchfile] || Infinity) < (compilation.fileTimestamps[watchfile] || Infinity); })
                .filter(function (f) {
                return (_this.extractor.options.patterns || [])
                    .map(globToRegExp)
                    .map(function (r) { return !!f.match(r); })
                    .reduce(function (acc, v) { return acc || v; }, false);
            });
            // update file change timestamp
            _this.fileTimestamps = compilation.fileTimestamps;
            // trigger new extraction
            if (changedFiles.length) {
                _this.extractor.execute(changedFiles);
            }
            // watch newly created files
            var o = _this.extractor.options;
            var extractedFiles = o.input.reduce(function (inputs, i) {
                return inputs.concat(utils_1.readDir(i, ["**/*." + o.format]));
            }, []);
            compilation.fileDependencies = compilation.fileDependencies.concat(extractedFiles);
            done();
        });
    };
    return ExtractorPlugin;
}());
exports.ExtractorPlugin = ExtractorPlugin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4QztBQUc5QyxrQ0FBbUM7QUFHbkM7O0dBRUc7QUFDSDtJQUtFLHlCQUFZLFNBQWdDLEVBQUUsT0FBMkI7UUFGakUsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFHMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLFFBQWtCO1FBQXhCLGlCQXFDQztRQXBDQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDLFdBQVc7WUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLFdBQVcsRUFBRSxJQUFJO1lBRXhDLDhFQUE4RTtZQUM5RSxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aUJBQ3pELE1BQU0sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLEVBQWxHLENBQWtHLENBQUM7aUJBQ3ZILE1BQU0sQ0FBQyxVQUFBLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztxQkFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDakIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBVyxDQUFDLEVBQXRCLENBQXNCLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBQSxHQUFHLElBQUksQ0FBQyxFQUFSLENBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVMLCtCQUErQjtZQUMvQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFFakQseUJBQXlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsNEJBQTRCO1lBQzVCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBYyxDQUFDO1lBQ3hDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFRLENBQUMsQ0FBQyxNQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsV0FBVyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFbkYsSUFBSSxFQUFFLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBbERBLEFBa0RDLElBQUE7QUFsRFksMENBQWUiLCJmaWxlIjoid2VicGFjay9FeHRyYWN0b3JQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBnbG9iVG9SZWdFeHAgZnJvbSAnZ2xvYi10by1yZWdleHAnXG5pbXBvcnQgeyBDb21waWxlciwgUGx1Z2luIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3IgfSBmcm9tICcuLi9OZ3hUcmFuc2xhdGVFeHRyYWN0b3InO1xuaW1wb3J0IHsgcmVhZERpciB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFBhcnNlckludGVyZmFjZSB9IGZyb20gJy4uL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuXG4vKipcbiAqIFdlYnBhY2sgcGx1Z2luIHRoYXQgZXh0cmFjdHMgdHJhbnNsYXRpb24gZnJvbSBhbnkgZmlsZSwgdXNpbmcgTmd4VHJhbnNsYXRlRXh0cmFjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgRXh0cmFjdG9yUGx1Z2luIGltcGxlbWVudHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBleHRyYWN0b3I6IE5neFRyYW5zbGF0ZUV4dHJhY3RvcjtcbiAgcHJpdmF0ZSBjb21waWxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBmaWxlVGltZXN0YW1wcyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV4dHJhY3RvcjogTmd4VHJhbnNsYXRlRXh0cmFjdG9yLCBwYXJzZXJzPzogUGFyc2VySW50ZXJmYWNlW10pIHtcbiAgICB0aGlzLmV4dHJhY3RvciA9IGV4dHJhY3RvcjtcbiAgICBpZiAocGFyc2Vycykge1xuICAgICAgdGhpcy5leHRyYWN0b3Iuc2V0UGFyc2VycyhwYXJzZXJzKTtcbiAgICB9XG4gIH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGUnLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICAgIGlmICghdGhpcy5jb21waWxlZCkge1xuICAgICAgICB0aGlzLmV4dHJhY3Rvci5leGVjdXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBpbGVkID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgZG9uZSkgPT4ge1xuXG4gICAgICAvLyBmaWx0ZXIgY2hhbmdlZCBmaWxlcyB0byBvbmx5IGtlZXAgdGhvc2Ugd2hpY2ggY2FuIGNvbnRhaW4gbmV3IHRyYW5zbGF0aW9ucy5cbiAgICAgIGNvbnN0IGNoYW5nZWRGaWxlcyA9IE9iamVjdC5rZXlzKGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzKVxuICAgICAgICAuZmlsdGVyKHdhdGNoZmlsZSA9PiAodGhpcy5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSA8IChjb21waWxhdGlvbi5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSlcbiAgICAgICAgLmZpbHRlcihmID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuZXh0cmFjdG9yLm9wdGlvbnMucGF0dGVybnMgfHwgW10pXG4gICAgICAgICAgICAubWFwKGdsb2JUb1JlZ0V4cClcbiAgICAgICAgICAgIC5tYXAociA9PiAhIWYubWF0Y2gociBhcyBzdHJpbmcpKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiBhY2MgfHwgdiwgZmFsc2UpXG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB1cGRhdGUgZmlsZSBjaGFuZ2UgdGltZXN0YW1wXG4gICAgICB0aGlzLmZpbGVUaW1lc3RhbXBzID0gY29tcGlsYXRpb24uZmlsZVRpbWVzdGFtcHM7XG5cbiAgICAgIC8vIHRyaWdnZXIgbmV3IGV4dHJhY3Rpb25cbiAgICAgIGlmIChjaGFuZ2VkRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdG9yLmV4ZWN1dGUoY2hhbmdlZEZpbGVzKTtcbiAgICAgIH1cblxuICAgICAgLy8gd2F0Y2ggbmV3bHkgY3JlYXRlZCBmaWxlc1xuICAgICAgY29uc3QgbyA9IHRoaXMuZXh0cmFjdG9yLm9wdGlvbnMgYXMgYW55O1xuICAgICAgY29uc3QgZXh0cmFjdGVkRmlsZXMgPSBvLmlucHV0LnJlZHVjZSgoaW5wdXRzLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBpbnB1dHMuY29uY2F0KHJlYWREaXIoaSwgW2AqKi8qLiR7by5mb3JtYXR9YF0pKVxuICAgICAgfSwgW10pO1xuICAgICAgY29tcGlsYXRpb24uZmlsZURlcGVuZGVuY2llcyA9IGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMuY29uY2F0KGV4dHJhY3RlZEZpbGVzKTtcblxuICAgICAgZG9uZSgpXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
