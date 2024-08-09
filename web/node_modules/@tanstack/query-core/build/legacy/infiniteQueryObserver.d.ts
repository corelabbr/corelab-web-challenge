import { y as DefaultError, X as InfiniteData, z as QueryKey, c as QueryObserver, aB as InfiniteQueryObserverResult, aY as ObserverFetchOptions, b as QueryClient, a7 as InfiniteQueryObserverOptions, aZ as NotifyOptions, a8 as DefaultedInfiniteQueryObserverOptions, ai as FetchNextPageOptions, aj as FetchPreviousPageOptions, u as Query } from './hydration-zFr_7WN8.js';
import './removable.js';
import './subscribable.js';

type InfiniteQueryObserverListener<TData, TError> = (result: InfiniteQueryObserverResult<TData, TError>) => void;
declare class InfiniteQueryObserver<TQueryFnData = unknown, TError = DefaultError, TData = InfiniteData<TQueryFnData>, TQueryData = TQueryFnData, TQueryKey extends QueryKey = QueryKey, TPageParam = unknown> extends QueryObserver<TQueryFnData, TError, TData, InfiniteData<TQueryData, TPageParam>, TQueryKey> {
    subscribe: (listener?: InfiniteQueryObserverListener<TData, TError>) => () => void;
    getCurrentResult: () => InfiniteQueryObserverResult<TData, TError>;
    protected fetch: (fetchOptions: ObserverFetchOptions) => Promise<InfiniteQueryObserverResult<TData, TError>>;
    constructor(client: QueryClient, options: InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>);
    protected bindMethods(): void;
    setOptions(options: InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>, notifyOptions?: NotifyOptions): void;
    getOptimisticResult(options: DefaultedInfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>): InfiniteQueryObserverResult<TData, TError>;
    fetchNextPage(options?: FetchNextPageOptions): Promise<InfiniteQueryObserverResult<TData, TError>>;
    fetchPreviousPage(options?: FetchPreviousPageOptions): Promise<InfiniteQueryObserverResult<TData, TError>>;
    protected createResult(query: Query<TQueryFnData, TError, InfiniteData<TQueryData, TPageParam>, TQueryKey>, options: InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>): InfiniteQueryObserverResult<TData, TError>;
}

export { InfiniteQueryObserver };
