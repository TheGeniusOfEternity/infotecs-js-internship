import type { ErrorResponseDto } from "@/api/dto/error-response.dto";
import {apiConf} from "@/api/apiConf";

interface RequestConfig<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
}

class Resolver {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<U, S>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: U,
    headers: Record<string, string> = {},
  ): Promise<S | ErrorResponseDto> {
    const fullUrl = `${apiConf.endpoint}/${this.baseUrl}${url && !url.startsWith("?") ? "/" : ""}${url}`;
    const config: RequestConfig<U> = {
      url: fullUrl,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      config.body = body;
    }

    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      if (!response.ok) {
        return {
          status: response.status,
          message: response.statusText,
        }
      }

      return await response.json();
    } catch (error: unknown) {
      console.error(String(error));
      return {
        status: 0,
        message: error instanceof Error ? error.message : String(error),
      }
    }
  }
}

export default Resolver;
