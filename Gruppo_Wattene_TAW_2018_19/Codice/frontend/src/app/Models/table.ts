export class TableModel {
  // tslint:disable-next-line: variable-name
  _id: string;
  // la cassa assegnerà un camereiere loggato al tavolo
  // tslint:disable-next-line: variable-name
  waiter_id: string;
  // tslint:disable-next-line: variable-name
  order_id: string;
  // tslint:disable-next-line: variable-name
  table_number: number;
  // tslint:disable-next-line: variable-name
  total_seats: number;
  available: boolean;
  clients: number;
}
