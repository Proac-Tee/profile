"use client";

import React, { Suspense, ReactNode, FC } from "react";
import Loading from "./Loading";

interface SuspenseWrapperProps {
  fallback?: ReactNode;
  children: ReactNode;
}

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({ fallback, children }) => {
  return <Suspense fallback={fallback || <Loading />}>{children}</Suspense>;
};

export default SuspenseWrapper;
