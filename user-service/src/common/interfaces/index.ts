export interface IDateQuery {
  dateName: string;
  startDateField: string;
  endDateField: string;
}

export interface IQueryBuilder {
  selectFields: string[],
  unaccentFields: string[],
  numberFields: number[],
  stringFields: string[],
  dateFields: IDateQuery,
  sortName: string,
}