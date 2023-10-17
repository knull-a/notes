import { AxiosInstance } from "axios";
import { BaseRest } from "../base";
import { Label } from "./types";
import { WithPage } from "../types";

export class LabelRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public getLabels(params?: object) {
    return this.get<Label[]>("/labels/", {
      params,
    });
  }

  public deleteLabel(id: string) {
    return this.delete<Label>(`/labels/${id}/`);
  }

  public postLabel(data: object) {
    return this.post<Label>("/labels/", data);
  }

  public patchLabel(data: object, id: string) {
    return this.patch<Label>(`/labels/${id}/`, data);
  }
}
