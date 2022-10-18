import { DataErrorTuple } from '../../types/common/data-error-tuple.type';

type ValidQueryParams = {
  [key: string]: string;
};

type GetOptions<QueryParams> = {
  url: string;
  queryParams?: QueryParams;
};

export interface HttpAdapter {
  get<Response, QueryParams extends ValidQueryParams = {}>(
    options: GetOptions<QueryParams>
  ): Promise<DataErrorTuple<Response, Error>>;
}
