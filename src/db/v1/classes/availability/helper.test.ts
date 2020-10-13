import { CreateDateRangeAndCheck } from './helper';
import moment from 'moment';

describe('check helper file for availability', () => {
  test('should return range CreateDateRangeAndCheck', () => {
    const dateFrom = moment('2020-09-25T17:30:00.000Z');
    const dateTo = dateFrom.clone().add(5, 'days').add(2, 'hours');

    const dateFromISO = dateFrom.toISOString();
    const dateToISO = dateTo.toISOString();

    const { result, error } = CreateDateRangeAndCheck(dateFromISO, dateToISO);

    const [firstDate, ...dates] = result || [];

    expect(error).toBeUndefined();
    expect(result?.length).toBe(6);
    expect(firstDate?.from).toBe(dateFromISO);
    expect(firstDate?.to).toBe(dateFrom.clone().add(2, 'hours').toISOString());
    expect(dates.pop()?.to).toBe(dateTo.toISOString());
  });

  test('should skip 2nd day of the week CreateDateRangeAndCheck', () => {
    const dateFrom = moment('2020-09-25T17:30:00.000Z');
    const dateTo = dateFrom.clone().add(5, 'days').add(2, 'hours');

    const { result, error } = CreateDateRangeAndCheck(
      dateFrom.toISOString(),
      dateTo.toISOString(),
      ['1']
    );

    expect(error).toBeUndefined();
    expect(result?.length).toBe(1);
  });

  test('should fail on 1st date', () => {
    const dateFrom = 'asdasd';
    const dateTo = moment().add(5, 'days').add(2, 'hours');

    const { error, result } = CreateDateRangeAndCheck(
      dateFrom,
      dateTo.toISOString(),
      ['1']
    );

    expect(result).toBeUndefined();
    expect(error).toBeDefined();
    expect(error).toBe(`From date "${dateFrom}" is not a valid date`);
  });

  test('should fail on 2nd date', () => {
    const dateFrom = moment().toISOString();
    const dateTo = 'asdasd';

    const { error } = CreateDateRangeAndCheck(dateFrom, dateTo, ['1']);

    expect(error).toBeDefined();
    expect(error).toBe(`To date "${dateTo}" is not a valid date`);
  });

  test('should fail on date to is earlier than from', () => {
    const dateFrom = moment().add(5, 'days').add(2, 'hours').toISOString();
    const dateTo = moment().toISOString();

    const { error } = CreateDateRangeAndCheck(dateFrom, dateTo);

    expect(error).toBeDefined();
    expect(error).toBe('"From" date must be before "To" date');
  });

  test('should fail on 2nd date', () => {
    const dateFrom = moment().toISOString();
    const dateTo = moment().add(2, 'minutes').toISOString();

    const { error } = CreateDateRangeAndCheck(dateFrom, dateTo);

    expect(error).toBeDefined();
    expect(error).toBe('Booking for less than 30 min is prohibited');
  });

  test('should return only the one range day', () => {
    const dateFrom = moment().toISOString();
    const dateTo = moment().add(45, 'minutes').toISOString();

    const { result = [], error } = CreateDateRangeAndCheck(dateFrom, dateTo);

    expect(error).toBeUndefined();
    expect(result?.length).toBe(1);
    expect(result[0].from).toBe(dateFrom);
    expect(result[0].to).toBe(dateTo);
  });

  test('should fail to return range as limiter is set to allow a different day of the week', () => {
    const dateFrom = moment('2020-09-25T17:30:00.000Z');
    const dateTo = dateFrom.clone().add(45, 'minutes').toISOString();

    const { result, error } = CreateDateRangeAndCheck(
      dateFrom.toISOString(),
      dateTo,
      ['4']
    );

    expect(result).toBeUndefined();
    expect(error).toBe(
      'After calculation there are no availability to create, please double check the input dates and days limiter'
    );
  });
});
