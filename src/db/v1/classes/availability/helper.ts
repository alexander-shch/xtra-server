import moment from 'moment';

interface TimeRange {
  from: string;
  to: string;
}

export function CreateDateRangeAndCheck(
  from: string,
  to: string,
  daysLimiter: string[] = []
): { error?: string; result?: TimeRange[] } {
  const fromDate = moment(from);
  const toDate = moment(to);
  const daysLimiterNumbers = daysLimiter.map(Number);

  if (!fromDate.isValid()) {
    return {
      error: `From date "${from}" is not a valid date`,
    };
  }

  if (!toDate.isValid()) {
    return {
      error: `To date "${to}" is not a valid date`,
    };
  }

  if (fromDate.isAfter(toDate)) {
    return {
      error: '"From" date must be before "To" date',
    };
  }

  if (toDate.diff(fromDate, 'minutes') < 30) {
    return {
      error: 'Booking for less than 30 min is prohibited',
    };
  }

  const range = toDate.diff(fromDate, 'day');
  const rangeMin = toDate.clone().add(-Math.abs(range), 'days').diff(fromDate, 'minutes');

  const singularDefaultResult: TimeRange[] = [];

  if (range === 0) {
    singularDefaultResult.push({
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    });
    return {
      result: singularDefaultResult,
    };
  } else if (range > 0 && !daysLimiterNumbers.includes(fromDate.day())) {
    singularDefaultResult.push({
      from: fromDate.toISOString(),
      to: toDate.clone().add(-Math.abs(range), 'days').toISOString(),
    });
  }

  const futureResults = new Array(range)
    .fill(0)
    .map((_, index) => index + 1)
    .map((incrementor, _, arr) => {
      const currentDate = fromDate.clone().add(incrementor, 'days');
      if (
        daysLimiterNumbers.length > 0 &&
        daysLimiterNumbers.includes(currentDate.day())
      ) {
        return undefined;
      }
      return {
        from: currentDate.toISOString(),
        to:
          incrementor === arr.length
            ? toDate.toISOString()
            : currentDate.clone().add(rangeMin, 'minutes').toISOString(),
      };
    });

  if (futureResults.length === 0) {
    return {
      error:
        'After calculation there are no availability to create, please double check the input dates and days limiter',
    };
  }

  return {
    result: singularDefaultResult.concat(
      futureResults.filter(Boolean) as TimeRange[]
    ),
  };
}
