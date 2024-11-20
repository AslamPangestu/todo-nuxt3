type MetaSchemaType = {
  message: string;
  status: string;
  code: number;
};

export interface Response<T> {
  data: T;
  meta: MetaSchemaType;
}

export interface FetchResponse<T> {
  response: T | null;
  error: string | null;
}

export interface FetchResponseAction {
  error: string | null;
}
