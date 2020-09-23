import { CreateDateRangeAndCheck } from './helper';
import moment from 'moment';

describe('check helper file for availability', () => {
  test('should return range CreateDateRangeAndCheck', () => {
    const dateFrom = moment();
    const dateTo = moment().add(5, 'days').add(2, 'hours');

    const { result, error } = CreateDateRangeAndCheck(
      dateFrom.toISOString(),
      dateTo.toISOString()
    );

    const [firstDate, ...dates] = result || [];

    expect(error).toBeUndefined();
    expect(result?.length).toBe(6);
    expect(firstDate?.from).toBe(dateFrom.toISOString());
    expect(firstDate?.to).toBe(dateFrom.clone().add(2, 'hours').toISOString());
    expect(dates.pop()?.to).toBe(dateTo.toISOString());
  });

  test('should skip 2nd day of the week CreateDateRangeAndCheck', () => {
    const dateFrom = moment();
    const dateTo = moment().add(5, 'days').add(2, 'hours');

    const { result, error } = CreateDateRangeAndCheck(
      dateFrom.toISOString(),
      dateTo.toISOString(),
      ['1']
    );

    expect(error).toBeUndefined();
    expect(result?.length).toBe(5);
  });

  test('should fail on 1st date', () => {
    const dateFrom = 'asdasd';
    const dateTo = moment().add(5, 'days').add(2, 'hours');

    const { error } = CreateDateRangeAndCheck(dateFrom, dateTo.toISOString(), [
      '1',
    ]);

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

    const { result, error } = CreateDateRangeAndCheck(dateFrom, dateTo);

    expect(error).toBeUndefined();
    expect(result?.length).toBe(1);
  });
});
