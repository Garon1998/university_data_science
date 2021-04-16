export class SuborderModel {
  _id: string;
  order_id: string;
  served_by: string;
  ordered_foods: {
    _id: string;
    food_id: string;
    quantity: number;
    time: number;
    name: string;
    price: number;
    prepared_by: string;
  }[];
  ordered_drinks?: {
    _id: string;
    drink_id: string;
    quantity: number;
    time: number;
    name: string;
    price: number;
    prepared_by: string;
  }[];
  createdAt: string;
  state_foods: string;
  state_drinks: string;
}

export enum SuborderState {
  incoda = 'In coda',
  inpreparazione = 'In preparazione',
  pronto = 'Pronto',
  servito = 'Servito',
}
