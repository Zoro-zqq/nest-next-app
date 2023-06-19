import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module '*.module.css' {
  const styles: { readonly [key: string]: string }
  export default styles
}

declare module '*.module.scss' {
  const styles: { readonly [key: string]: string }
  export default styles
}

declare module 'axios' {
  interface AxiosResponse<T = any> {
    // 这个地方放属性
    token: any
    requestFail: any
    error: any
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}

declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

declare enum role {
  admin,
  visitor
}

/**
 * 处理react tsx中直接使用web components报错问题
 */
// interface SheetCellInputModuleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
// 	title: string,
// }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sheet-cell-input': any
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    captcha: string
    verify_key: string
    userId: string
  }
}
