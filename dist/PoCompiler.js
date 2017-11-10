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
var ExtendedTranslationCollection_1 = require("./ExtendedTranslationCollection");
var gettext = require("gettext-parser");
var _ = require("lodash");
/**
 * Extends original PoCompiler to add metadata
 */
var PoCompiler = /** @class */ (function (_super) {
    __extends(PoCompiler, _super);
    function PoCompiler(options) {
        return _super.call(this, options) || this;
    }
    PoCompiler.prototype.compile = function (collection) {
        collection.meta = collection.meta || _.noop;
        var data = {
            charset: 'utf-8',
            headers: {
                'mime-version': '1.0',
                'content-type': 'text/plain; charset=utf-8',
                'content-transfer-encoding': '8bit'
            },
            translations: (_a = {},
                _a[this.domain] = Object.keys(collection.values)
                    .reduce(function (translations, key) {
                    var meta = collection.meta[key] || {};
                    translations[key] = {
                        msgid: key,
                        msgstr: collection.get(key),
                        msgctxt: meta.meaning,
                        comments: {
                            reference: meta.location,
                            extracted: meta.description
                        }
                    };
                    return translations;
                }, {}),
                _a)
        };
        return gettext.po.compile(data);
        var _a;
    };
    PoCompiler.prototype.parse = function (contents) {
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
        var domain = this.domain;
        var po = gettext.po.parse(contents, 'utf-8');
        var translations = Object.keys(po.translations)
            .reduce(function (translations, domain) {
            return Object.assign(translations, po.translations[domain]);
        }, {});
        if (!Object.keys(translations).length) {
            return collection;
        }
        var values = {};
        var meta = {};
        Object.keys(translations)
            .filter(function (key) { return key.length > 0; })
            .forEach(function (key) {
            values[key] = translations[key].msgstr.pop();
            meta[key] = {
                location: translations[key].reference,
                meaning: translations[key].msgctxt,
                description: translations[key].extracted
            };
        }, {});
        return new ExtendedTranslationCollection_1.ExtendedTranslationCollection(values, meta);
    };
    return PoCompiler;
}(biesbjerg_ngx_translate_extract_1.PoCompiler));
exports.PoCompiler = PoCompiler;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTO2dCQUNyQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Z0JBQ2xDLFdBQVcsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUzthQUN6QyxDQUFDO1FBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVQsTUFBTSxDQUFDLElBQUksNkRBQTZCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFSCxpQkFBQztBQUFELENBbEVBLEFBa0VDLENBbEUrQiw0Q0FBYSxHQWtFNUM7QUFsRVksZ0NBQVUiLCJmaWxlIjoiUG9Db21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvQ29tcGlsZXIgYXMgTmd4UG9Db21waWxlciB9IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4vRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25NZXRhIH0gZnJvbSAnLi9UcmFuc2xhdGlvbk1ldGEnO1xuaW1wb3J0ICogYXMgZ2V0dGV4dCBmcm9tICdnZXR0ZXh0LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogRXh0ZW5kcyBvcmlnaW5hbCBQb0NvbXBpbGVyIHRvIGFkZCBtZXRhZGF0YVxuICovXG5leHBvcnQgY2xhc3MgUG9Db21waWxlciBleHRlbmRzIE5neFBvQ29tcGlsZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgfVxuXG4gIGNvbXBpbGUoY29sbGVjdGlvbjogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24pOiBzdHJpbmcge1xuICAgIGNvbGxlY3Rpb24ubWV0YSA9IGNvbGxlY3Rpb24ubWV0YSB8fCBfLm5vb3A7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ21pbWUtdmVyc2lvbic6ICcxLjAnLFxuICAgICAgICAnY29udGVudC10eXBlJzogJ3RleHQvcGxhaW47IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAnY29udGVudC10cmFuc2Zlci1lbmNvZGluZyc6ICc4Yml0J1xuICAgICAgfSxcbiAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICBbdGhpcy5kb21haW5dOiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgICAucmVkdWNlKCh0cmFuc2xhdGlvbnMsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBjb2xsZWN0aW9uLm1ldGFba2V5XSB8fCB7fSBhcyBUcmFuc2xhdGlvbk1ldGE7XG4gICAgICAgICAgdHJhbnNsYXRpb25zW2tleV0gPSB7XG4gICAgICAgICAgICBtc2dpZDoga2V5LFxuICAgICAgICAgICAgbXNnc3RyOiBjb2xsZWN0aW9uLmdldChrZXkpLFxuICAgICAgICAgICAgbXNnY3R4dDogbWV0YS5tZWFuaW5nLFxuICAgICAgICAgICAgY29tbWVudHM6IHtcbiAgICAgICAgICAgICAgcmVmZXJlbmNlOiBtZXRhLmxvY2F0aW9uLFxuICAgICAgICAgICAgICBleHRyYWN0ZWQ6IG1ldGEuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gICAgICAgIH0sIDxhbnk+IHt9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZ2V0dGV4dC5wby5jb21waWxlKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlKGNvbnRlbnRzOiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiAoKTtcbiAgICBjb25zdCBkb21haW4gPSB0aGlzLmRvbWFpbjtcbiAgICBjb25zdCBwbyA9IGdldHRleHQucG8ucGFyc2UoY29udGVudHMsICd1dGYtOCcpO1xuXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gT2JqZWN0LmtleXMocG8udHJhbnNsYXRpb25zKVxuICAgICAgLnJlZHVjZSgodHJhbnNsYXRpb25zLCBkb21haW4pID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odHJhbnNsYXRpb25zLCBwby50cmFuc2xhdGlvbnNbZG9tYWluXSk7XG4gICAgICB9LCB7fSk7XG5cbiAgICBpZiAoIU9iamVjdC5rZXlzKHRyYW5zbGF0aW9ucykubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZXMgPSB7fTtcbiAgICBjb25zdCBtZXRhOiB7W2tleTogc3RyaW5nXTogVHJhbnNsYXRpb25NZXRhfSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRyYW5zbGF0aW9ucylcbiAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5sZW5ndGggPiAwKVxuICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IHRyYW5zbGF0aW9uc1trZXldLm1zZ3N0ci5wb3AoKTtcbiAgICAgICAgbWV0YVtrZXldID0ge1xuICAgICAgICAgIGxvY2F0aW9uOiB0cmFuc2xhdGlvbnNba2V5XS5yZWZlcmVuY2UsXG4gICAgICAgICAgbWVhbmluZzogdHJhbnNsYXRpb25zW2tleV0ubXNnY3R4dCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogdHJhbnNsYXRpb25zW2tleV0uZXh0cmFjdGVkXG4gICAgICAgIH07XG4gICAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKHZhbHVlcywgbWV0YSk7XG4gIH1cblxufVxuIl19
