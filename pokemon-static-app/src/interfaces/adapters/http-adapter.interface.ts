import { DataErrorTuple } from '../../types/common/data-error-tuple.type';

type GetOptions<QueryParams> = {
  url: string;
  queryParams: QueryParams;
};

export interface HttpAdapter {
  get<QueryParams extends { [key: string]: string }, Response>(
    options: GetOptions<QueryParams>
  ): Promise<DataErrorTuple<Response, Error>>;
}
