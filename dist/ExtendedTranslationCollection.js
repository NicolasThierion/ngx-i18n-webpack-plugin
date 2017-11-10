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
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var ExtendedTranslationCollection = /** @class */ (function (_super) {
    __extends(ExtendedTranslationCollection, _super);
    function ExtendedTranslationCollection(values, meta) {
        if (values === void 0) { values = {}; }
        if (meta === void 0) { meta = {}; }
        var _this = _super.call(this, values) || this;
        _this.meta = meta;
        return _this;
    }
    ExtendedTranslationCollection.of = function (collection) {
        if (biesbjerg_ngx_translate_extract_1.TranslationCollection instanceof ExtendedTranslationCollection) {
            return collection;
        }
        return new ExtendedTranslationCollection(collection.values, {});
    };
    ExtendedTranslationCollection.prototype.add = function (key, val, meta) {
        if (val === void 0) { val = ''; }
        if (meta === void 0) { meta = {}; }
        return new ExtendedTranslationCollection(Object.assign({}, this.values, (_a = {}, _a[key] = val, _a)), Object.assign({}, this.meta, (_b = {}, _b[key] = meta, _b)));
        var _a, _b;
    };
    ExtendedTranslationCollection.prototype.addKeys = function (keys) {
        var values = keys.reduce(function (results, key) {
            results[key] = '';
            return results;
        }, {});
        var meta = keys.reduce(function (results, key) {
            results[key] = '';
            return results;
        }, {});
        return new ExtendedTranslationCollection(values, meta);
    };
    ExtendedTranslationCollection.prototype.remove = function (key) {
        return this.filter(function (k) { return key !== k; });
    };
    ExtendedTranslationCollection.prototype.forEach = function (callback) {
        var _this = this;
        Object.keys(this.values)
            .forEach(function (key) { return callback.call(_this, key, _this.values[key], _this.meta[key]); });
        return this;
    };
    ExtendedTranslationCollection.prototype.filter = function (callback) {
        var _this = this;
        var values = {};
        var metas = {};
        this.forEach(function (key, val, meta) {
            if (callback.call(_this, key, val, meta)) {
                values[key] = val;
                metas[key] = meta;
            }
        });
        return new ExtendedTranslationCollection(values, metas);
    };
    ExtendedTranslationCollection.prototype.union = function (collection) {
        return new ExtendedTranslationCollection(Object.assign({}, this.values, collection.values), Object.assign({}, this.meta, collection.meta || {}));
    };
    ExtendedTranslationCollection.prototype.intersect = function (collection) {
        var values = {};
        var metas = {};
        this.filter(function (key) { return collection.has(key); })
            .forEach(function (key, val, meta) {
            values[key] = val;
            metas[key] = meta;
        });
        return new ExtendedTranslationCollection(values, metas);
    };
    ExtendedTranslationCollection.prototype.has = function (key) {
        return this.values.hasOwnProperty(key);
    };
    ExtendedTranslationCollection.prototype.get = function (key) {
        return this.values[key];
    };
    ExtendedTranslationCollection.prototype.keys = function () {
        return Object.keys(this.values);
    };
    ExtendedTranslationCollection.prototype.count = function () {
        return Object.keys(this.values).length;
    };
    ExtendedTranslationCollection.prototype.isEmpty = function () {
        return Object.keys(this.values).length === 0;
    };
    ExtendedTranslationCollection.prototype.sort = function (compareFn) {
        var _this = this;
        var values = {};
        var meta = {};
        this.keys().sort(compareFn).forEach(function (key) {
            values[key] = _this.get(key);
            meta[key] = _this.meta[key];
        });
        return new ExtendedTranslationCollection(values, meta);
    };
    return ExtendedTranslationCollection;
}(biesbjerg_ngx_translate_extract_1.TranslationCollection));
exports.ExtendedTranslationCollection = ExtendedTranslationCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxRkFBMEU7QUFLMUU7SUFBbUQsaURBQXFCO0lBSXRFLHVDQUFtQixNQUE0QixFQUFFLElBQVM7UUFBdkMsdUJBQUEsRUFBQSxXQUE0QjtRQUFFLHFCQUFBLEVBQUEsU0FBUztRQUExRCxZQUNFLGtCQUFNLE1BQU0sQ0FBQyxTQUVkO1FBREMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ25CLENBQUM7SUFFTSxnQ0FBRSxHQUFULFVBQVUsVUFBaUM7UUFDekMsRUFBRSxDQUFDLENBQUMsdURBQXFCLFlBQVksNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxVQUEyQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwyQ0FBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLEdBQWdCLEVBQUUsSUFBMEI7UUFBNUMsb0JBQUEsRUFBQSxRQUFnQjtRQUFFLHFCQUFBLEVBQUEsU0FBMEI7UUFDbEUsTUFBTSxDQUFDLElBQUksNkJBQTZCLENBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLFlBQUksR0FBQyxHQUFHLElBQUcsR0FBRyxNQUFHLEVBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLFlBQUksR0FBQyxHQUFHLElBQUcsSUFBSSxNQUFHLENBQzlDLENBQUM7O0lBQ0osQ0FBQztJQUVNLCtDQUFPLEdBQWQsVUFBZSxJQUFjO1FBQzNCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFPLEVBQUUsR0FBRztZQUN0QyxPQUFPLENBQUMsR0FBRyxD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R0MsQ0E1R2tELHVEQUFxQixHQTRHdkU7QUE1R1ksc0VBQTZCIiwiZmlsZSI6IkV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRpb25Db2xsZWN0aW9uIH0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IFRyYW5zbGF0aW9uTWV0YSB9IGZyb20gJy4vVHJhbnNsYXRpb25NZXRhJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uVHlwZSB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcblxudHlwZSBNZXRhTWFwVHlwZSA9IHtba2V5OiBzdHJpbmddOiBUcmFuc2xhdGlvbk1ldGF9O1xuZXhwb3J0IGNsYXNzIEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIGV4dGVuZHMgVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcblxuICBwdWJsaWMgbWV0YTogTWV0YU1hcFR5cGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHZhbHVlczogVHJhbnNsYXRpb25UeXBlID0ge30sIG1ldGEgPSB7fSkge1xuICAgIHN1cGVyKHZhbHVlcyk7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgfVxuXG4gIHN0YXRpYyBvZihjb2xsZWN0aW9uOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgaWYgKFRyYW5zbGF0aW9uQ29sbGVjdGlvbiBpbnN0YW5jZW9mIEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbiBhcyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbihjb2xsZWN0aW9uLnZhbHVlcywge30pO1xuICB9XG5cbiAgcHVibGljIGFkZChrZXk6IHN0cmluZywgdmFsOiBzdHJpbmcgPSAnJywgbWV0YTogVHJhbnNsYXRpb25NZXRhID0ge30pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbihcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMudmFsdWVzLCB7IFtrZXldOiB2YWwgfSksXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1ldGEsIHsgW2tleV06IG1ldGEgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZEtleXMoa2V5czogc3RyaW5nW10pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgdmFsdWVzID0ga2V5cy5yZWR1Y2UoKHJlc3VsdHMsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0c1trZXldID0gJyc7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zdCBtZXRhID0ga2V5cy5yZWR1Y2UoKHJlc3VsdHMsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0c1trZXldID0gJyc7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LCB7fSk7XG5cblxuICAgIHJldHVybiBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24odmFsdWVzLCBtZXRhKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKGsgPT4ga2V5ICE9PSBrKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoKGNhbGxiYWNrOiAoa2V5OiBzdHJpbmcsIHZhbD86IHN0cmluZywgbWV0YT86IFRyYW5zbGF0aW9uTWV0YSkgPT4gdm9pZCk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcylcbiAgICAgIC5mb3JFYWNoKGtleSA9PiBjYWxsYmFjay5jYWxsKHRoaXMsIGtleSwgdGhpcy52YWx1ZXNba2V5XSwgdGhpcy5tZXRhW2tleV0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXIoY2FsbGJhY2s6IChrZXk6IHN0cmluZywgdmFsPzogc3RyaW5nLCBtZXRhPzogVHJhbnNsYXRpb25NZXRhKSA9PiBib29sZWFuKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIGxldCB2YWx1ZXM6IFRyYW5zbGF0aW9uVHlwZSA9IHt9O1xuICAgIGxldCBtZXRhczogTWV0YU1hcFR5cGUgPSB7fTtcbiAgICB0aGlzLmZvckVhY2goKGtleTogc3RyaW5nLCB2YWw6IHN0cmluZywgbWV0YTogVHJhbnNsYXRpb25NZXRhKSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzLCBrZXksIHZhbCwgbWV0YSkpIHtcbiAgICAgICAgdmFsdWVzW2tleV0gPSB2YWw7XG4gICAgICAgIG1ldGFzW2tleV0gPSBtZXRhO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24odmFsdWVzLCBtZXRhcyk7XG4gIH1cblxuICBwdWJsaWMgdW5pb24oY29sbGVjdGlvbjogVHJhbnNsYXRpb25Db2xsZWN0aW9uKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIHJldHVybiBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlcywgY29sbGVjdGlvbi52YWx1ZXMpLFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tZXRhLCAoY29sbGVjdGlvbiBhcyBhbnkpLm1ldGEgfHwge30pKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcnNlY3QoY29sbGVjdGlvbjogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IHZhbHVlczogVHJhbnNsYXRpb25UeXBlID0ge307XG4gICAgbGV0IG1ldGFzOiBNZXRhTWFwVHlwZSA9IHt9O1xuICAgIHRoaXMuZmlsdGVyKGtleSA9PiBjb2xsZWN0aW9uLmhhcyhrZXkpKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nLCB2YWw6IHN0cmluZywgbWV0YTogVHJhbnNsYXRpb25NZXRhKSA9PiB7XG4gICAgICAgIHZhbHVlc1trZXldID0gdmFsO1xuICAgICAgICBtZXRhc1trZXldID0gbWV0YTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbih2YWx1ZXMsIG1ldGFzKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc1trZXldO1xuICB9XG5cbiAgcHVibGljIGtleXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcyk7XG4gIH1cblxuICBwdWJsaWMgY291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy52YWx1ZXMpLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcykubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgcHVibGljIHNvcnQoY29tcGFyZUZuPzogKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBudW1iZXIpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IHZhbHVlczogVHJhbnNsYXRpb25UeXBlID0ge307XG4gICAgbGV0IG1ldGE6IE1ldGFNYXBUeXBlID0ge307XG4gICAgdGhpcy5rZXlzKCkuc29ydChjb21wYXJlRm4pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdmFsdWVzW2tleV0gPSB0aGlzLmdldChrZXkpO1xuICAgICAgbWV0YVtrZXldID0gdGhpcy5tZXRhW2tleV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKHZhbHVlcywgbWV0YSk7XG4gIH1cbn1cbiJdfQ==
