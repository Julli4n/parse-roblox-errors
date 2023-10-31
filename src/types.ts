type ChildError = { type: string; code: string } | {
  code: string | number | undefined;
  message: string;
  field?: string;
};

export type AnyError = {
  code?: string | number;
  message: string;
  userFacingMessage?: string;
  childErrors?: ChildError[];
  field?: string;
  fieldData?: string;
  hint?: string | null;
};
