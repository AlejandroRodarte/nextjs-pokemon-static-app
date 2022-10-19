export interface ActionProps<Type extends string = string, Payload = {}> {
  readonly type: Type;
  readonly payload?: Payload;
}