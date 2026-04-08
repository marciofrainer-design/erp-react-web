import { APP_FORM_OPTIONS } from "./consts";

type AppFormOption = (typeof APP_FORM_OPTIONS)[number];

export type AppServiceNode = {
  id: string;
  labelKey: string;
  children?: AppServiceNode[];
  formOption?: AppFormOption;
  enabled?: boolean;
};
