"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("../biesbjerg-ngx-translate-extract");
var $ = require("cheerio");
var ExtendedTranslationCollection_1 = require("../ExtendedTranslationCollection");
var I18nParser = /** @class */ (function (_super) {
    __extends(I18nParser, _super);
    function I18nParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    I18nParser.prototype.extract = function (contents, path) {
        if (path && this._isAngularComponent(path)) {
            contents = this._extractInlineTemplate(contents);
        }
        return this._parseTemplate(contents, path);
    };
    I18nParser.prototype._parseTemplate = function (template, path) {
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
        template = this._normalizeTemplateAttributes(template);
        var selector = '[ngx-i18n]';
        $(template)
            .find(selector)
            .addBack(selector)
            .each(function (i, element) {
            var $element = $(element);
            var attr = $element.attr('ngx-i18n') || '';
            var pattern = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
            var meta = {};
            var meaning, description, id;
            if (pattern.test(attr)) {
                var matches = attr.match(pattern);
                _a = matches.slice(1), meaning = _a[0], description = _a[1], id = _a[2];
                meta = {
                    meaning: meaning, description: description
                };
            }
            meta.location = path;
            $element
                .contents()
                .toArray()
                .filter(function (node) { return node.type === 'text'; })
                .map(function (node) { return node.nodeValue.trim(); })
                .filter(function (text) { return text.length > 0; })
                .map(function (text) { return text.replace(/%([^\s]*)/g, "{{$1}}"); }) // replaces '%value' with '{{value}}'
                .forEach(function (text) { return collection = collection.add(typeof id === 'undefined' ? text : id, text, meta); });
            var _a;
        });
        return collection;
    };
    /**
     * Angular's `[attr]="'val'"` syntax is not valid HTML,
     * so it can't be parsed by standard HTML parsers.
     * This method replaces `[attr]="'val'""` with `attr="val"`
     */
    I18nParser.prototype._normalizeTemplateAttributes = function (template) {
        return template.replace(/\[([^\]]+)\]="'([^']*)'"/g, '$1="$2"');
    };
    return I18nParser;
}(biesbjerg_ngx_translate_extract_1.AbstractTemplateParser));
exports.I18nParser = I18nParser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL0kxOG5QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0ZBQTZGO0FBRTdGLDJCQUE2QjtBQUM3QixrRkFBaUY7QUFHakY7SUFBZ0MsOEJBQXNCO0lBQXREOztJQXVEQSxDQUFDO0lBckRRLDRCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFUyxtQ0FBYyxHQUF4QixVQUF5QixRQUFnQixFQUFFLElBQWE7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSw2REFBNkIsRUFBRSxDQUFDO1FBRXJELFFBQVEsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQyxDQUFTLEVBQUUsT0FBdUI7WUFDdkMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQU0sT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFvQixFQUFFLENBQUM7WUFDL0IsSUFBSSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQXNCLENBQUM7Z0JBQzFELHFCQUE2QyxFQUE1QyxlQUFPLEVBQUUsbUJBQVcsRUFBRSxVQUFFLENBQXFCO2dCQUM5QyxJQUFJLEdBQUc7b0JBQ0wsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBO2lCQUNyQixDQUFBO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFFBQVE7aUJBQ0wsUUFBUSxFQUFFO2lCQUNWLE9BQU8sRUFBRTtpQkFDVCxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQztpQkFDcEMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFJLHFDQUFxQztpQkFDMUYsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQTdFLENBQTZFLENBQUMsQ0FBQzs7UUFDcEcsQ0FBQyxDQUFDLENBQUM7UUFFTCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08saURBQTRCLEdBQXRDLFVBQXVDLFFBQWdCO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDSCxpQkFBQztBQUFELENBdkRBLEFBdURDLENBdkQrQix3REFBc0IsR0F1RHJEO0FBdkRZLGdDQUFVIiwiZmlsZSI6InBhcnNlcnMvSTE4blBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0VGVtcGxhdGVQYXJzZXIsIFBhcnNlckludGVyZmFjZSB9IGZyb20gJy4uL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuXG5pbXBvcnQgKiBhcyAkIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IHsgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuLi9FeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbk1ldGEgfSBmcm9tICcuLi9UcmFuc2xhdGlvbk1ldGEnO1xuXG5leHBvcnQgY2xhc3MgSTE4blBhcnNlciBleHRlbmRzIEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgaW1wbGVtZW50cyBQYXJzZXJJbnRlcmZhY2Uge1xuXG4gIHB1YmxpYyBleHRyYWN0KGNvbnRlbnRzOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgaWYgKHBhdGggJiYgdGhpcy5faXNBbmd1bGFyQ29tcG9uZW50KHBhdGgpKSB7XG4gICAgICBjb250ZW50cyA9IHRoaXMuX2V4dHJhY3RJbmxpbmVUZW1wbGF0ZShjb250ZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlVGVtcGxhdGUoY29udGVudHMsIHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKTtcblxuICAgIHRlbXBsYXRlID0gdGhpcy5fbm9ybWFsaXplVGVtcGxhdGVBdHRyaWJ1dGVzKHRlbXBsYXRlKTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gJ1tuZ3gtaTE4bl0nO1xuICAgICQodGVtcGxhdGUpXG4gICAgICAuZmluZChzZWxlY3RvcilcbiAgICAgIC5hZGRCYWNrKHNlbGVjdG9yKVxuICAgICAgLmVhY2goKGk6IG51bWJlciwgZWxlbWVudDogQ2hlZXJpb0VsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgICAgICBsZXQgYXR0ciA9ICRlbGVtZW50LmF0dHIoJ25neC1pMThuJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvKD86KFtefEBdKilcXHwpPyhbXnxAXSopKD86QEAoW158QF0qKSk/LztcbiAgICAgICAgbGV0IG1ldGE6IFRyYW5zbGF0aW9uTWV0YSA9IHt9O1xuICAgICAgICBsZXQgbWVhbmluZywgZGVzY3JpcHRpb24sIGlkO1xuICAgICAgICBpZiAocGF0dGVybi50ZXN0KGF0dHIpKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IChhdHRyLm1hdGNoKHBhdHRlcm4pIGFzIFJlZ0V4cE1hdGNoQXJyYXkpO1xuICAgICAgICAgIFttZWFuaW5nLCBkZXNjcmlwdGlvbiwgaWRdID0gbWF0Y2hlcy5zbGljZSgxKTtcbiAgICAgICAgICBtZXRhID0ge1xuICAgICAgICAgICAgbWVhbmluZywgZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS5sb2NhdGlvbiA9IHBhdGg7XG5cbiAgICAgICAgJGVsZW1lbnRcbiAgICAgICAgICAuY29udGVudHMoKVxuICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS50eXBlID09PSAndGV4dCcpXG4gICAgICAgICAgLm1hcChub2RlID0+IG5vZGUubm9kZVZhbHVlLnRyaW0oKSlcbiAgICAgICAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuICAgICAgICAgIC5tYXAodGV4dCA9PiB0ZXh0LnJlcGxhY2UoLyUoW15cXHNdKikvZywgXCJ7eyQxfX1cIikpICAgIC8vIHJlcGxhY2VzICcldmFsdWUnIHdpdGggJ3t7dmFsdWV9fSdcbiAgICAgICAgICAuZm9yRWFjaCh0ZXh0ID0+IGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmFkZCh0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnID8gdGV4dDogaWQsIHRleHQsIG1ldGEpKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhcidzIGBbYXR0cl09XCIndmFsJ1wiYCBzeW50YXggaXMgbm90IHZhbGlkIEhUTUwsXG4gICAqIHNvIGl0IGNhbid0IGJlIHBhcnNlZCBieSBzdGFuZGFyZCBIVE1MIHBhcnNlcnMuXG4gICAqIFRoaXMgbWV0aG9kIHJlcGxhY2VzIGBbYXR0cl09XCIndmFsJ1wiXCJgIHdpdGggYGF0dHI9XCJ2YWxcImBcbiAgICovXG4gIHByb3RlY3RlZCBfbm9ybWFsaXplVGVtcGxhdGVBdHRyaWJ1dGVzKHRlbXBsYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF09XCInKFteJ10qKSdcIi9nLCAnJDE9XCIkMlwiJyk7XG4gIH1cbn1cbiJdfQ==
