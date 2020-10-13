import { ISetting } from '../db/v1/models/settings/model';

const VAT: ISetting = {
  name: 'VAT',
  description: 'Value-added tax',
  value: '',
};

const settings = {
  VAT,
};

export default settings;
