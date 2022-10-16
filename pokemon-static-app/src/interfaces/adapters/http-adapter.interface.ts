import { DataErrorTuple } from '../../types/common/data-error-tuple.type';

type ValidQueryParams = {
  [key: string]: string;
}

type GetOptions<QueryParams> = {
  url: string;
  queryParams: QueryParams;
};

export interface HttpAdapter {
  get<QueryParams extends ValidQueryParams, Response>(
    options: GetOptions<QueryParams>
  ): Promise<DataErrorTuple<Response, Error>>;
}
