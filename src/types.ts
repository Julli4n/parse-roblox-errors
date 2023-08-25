type ChildError = { type: string; code: string };

export type AnyError = {
    code?: string | number;
    message: string;
    childErrors?: ChildError[];
    field?: string;
    fieldData?: string;
    hint?: string | null;
};
