"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function ReactQuery({ children }){
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})