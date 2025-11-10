import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class Api {
  private axios!: AxiosInstance
  constructor(private readonly baseUrl: string) {
    const axiosInstance = axios.create({
      baseURL: this.baseUrl
    })
    axiosInstance.interceptors.response.use(null, this.responseErrorInterceptor)

    this.axios = axiosInstance
  }

  public async get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config)
  }

  public async post(url: string, data: any) {
    return this.axios.post(url, data)
  }

  public async patch(url: string, data: any) {
    return this.axios.patch(url, data)
  }

  public async delete(url: string) {
    return this.axios.delete(url)
  }

  private responseErrorInterceptor(error: any) {
    return Promise.reject(
      error.response?.data || { message: 'Ocorreu um erro inesperado' }
    )
  }
}
