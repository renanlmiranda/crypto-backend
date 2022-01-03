import { IsInt } from 'class-validator';

export default class QueryParamsClass {
  @IsInt()
  per_page = 10;

  @IsInt()
  page = 1;
}
