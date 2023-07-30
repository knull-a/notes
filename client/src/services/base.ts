import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export abstract class BaseRest {
  constructor(protected readonly endpoint: AxiosInstance) {}

  private static async extractData<T>(request: Promise<AxiosResponse<T>>) {
    const { data } = await request
    return data
  }

  protected get<T>(url: string, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.get<T>(url, { ...config }))
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.delete<T>(url, { ...config }))
  }

  protected patch<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.patch(url, data, config));
  }
  
  protected post<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.post(url, data, config));
  }

  protected postForm<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.postForm(url, data, config));
  }
  
  protected patchForm<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.patchForm(url, data, config));
  }
}
