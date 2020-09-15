"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDateRangeAndCheck = void 0;
var moment_1 = __importDefault(require("moment"));
function CreateDateRangeAndCheck(from, to) {
    var fromDate = moment_1.default(from);
    var toDate = moment_1.default(to);
    if (!fromDate.isValid()) {
        return {
            error: "From date \"" + from + "\" is not a valid date",
        };
    }
    if (!toDate.isValid()) {
        return {
            error: "To date \"" + to + "\" is not a valid date",
        };
    }
    if (fromDate.isAfter(toDate)) {
        return {
            error: 'From date must be before To date',
        };
    }
    if (toDate.diff(fromDate, 'minutes') < 45) {
        return {
            error: 'Booking for less than 45 min is prohibited',
        };
    }
    var range = toDate.diff(fromDate, 'day');
    var singularDefaultResult = [
        {
            from: fromDate.toISOString(),
            to: toDate.toISOString(),
        },
    ];
    if (range === 0) {
        return {
            result: singularDefaultResult,
        };
    }
    var futureResults = new Array(range)
        .fill(0)
        .map(function (_, index) { return index + 1; })
        .map(function (incrementor, _, arr) {
        var currentDate = fromDate.clone().add(incrementor, 'days');
        return {
            from: currentDate.startOf('day').toISOString(),
            to: incrementor === arr.length
                ? toDate.toISOString()
                : currentDate.endOf('day').toISOString(),
        };
    });
    return {
        result: singularDefaultResult.concat(futureResults),
    };
}
exports.CreateDateRangeAndCheck = CreateDateRangeAndCheck;
