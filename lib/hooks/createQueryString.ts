"use client";
import { useCallback } from "react";

export const createQueryString = (
  searchParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
) =>
  useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
