import type { Hit, SearchOptions } from '@algolia/client-search';
import type { SearchIndex } from 'algoliasearch/lite';
import { useState } from 'react';
import useSWR, { type SWRResponse } from 'swr';
import type { SortedResult } from '@/search/shared';
import type { BaseIndex } from './server';

export function groupResults(hits: Hit<BaseIndex>[]): SortedResult[] {
  const grouped: SortedResult[] = [];
  const scannedUrls = new Set<string>();

  for (const hit of hits) {
    if (!scannedUrls.has(hit.url)) {
      scannedUrls.add(hit.url);

      grouped.push({
        id: hit.url,
        type: 'page',
        url: hit.url,
        content: hit.title,
      });
    }

    grouped.push({
      id: hit.objectID,
      type: hit.content === hit.section ? 'heading' : 'text',
      url: hit.section_id ? `${hit.url}#${hit.section_id}` : hit.url,
      content: hit.content,
    });
  }

  return grouped;
}

export async function searchDocs(
  index: SearchIndex,
  query: string,
  options?: SearchOptions,
): Promise<SortedResult[]> {
  const result = await index.search<BaseIndex>(query, {
    distinct: 5,
    hitsPerPage: 10,
    ...options,
  });

  return groupResults(result.hits);
}

interface UseAlgoliaSearch {
  search: string;
  setSearch: (v: string) => void;
  query: SWRResponse<
    SortedResult[] | 'empty',
    Error,
    { keepPreviousData: true }
  >;
}

export function useAlgoliaSearch(
  index: SearchIndex,
  options?: SearchOptions,
): UseAlgoliaSearch {
  const [search, setSearch] = useState('');

  const query = useSWR(
    ['/api/search', search, options],
    async ([, searchV, optionsV]) => {
      if (searchV.length === 0) return 'empty';

      return searchDocs(index, searchV, optionsV);
    },
    {
      keepPreviousData: true,
    },
  );

  return { search, setSearch, query };
}
