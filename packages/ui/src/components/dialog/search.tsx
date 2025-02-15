import { FileTextIcon, HashIcon, TextIcon } from 'lucide-react';
import type { SortedResult } from 'next-docs-zeta/search/shared';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { useI18n } from '@/contexts/i18n';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export interface SharedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type SearchDialogProps = SharedProps & {
  search: string;
  onSearchChange: (v: string) => void;
  data: SortedResult[] | 'empty' | undefined;
  /**
   * displayed at bottom
   */
  footer?: ReactNode;
  /**
   * displayed in item list
   */
  children?: ReactNode;
};

export function SearchDialog({
  search,
  onSearchChange,
  data,
  ...props
}: SearchDialogProps): JSX.Element {
  const router = useRouter();
  const { text } = useI18n();

  const onOpen = (url: string): void => {
    router.push(url);
    props.onOpenChange(false);
  };

  return (
    <CommandDialog {...props}>
      <CommandInput
        placeholder={text.search ?? 'Search'}
        value={search}
        onValueChange={onSearchChange}
      />
      <CommandList>
        {data !== 'empty' ? (
          <>
            <CommandEmpty>
              {text.searchNoResult ?? 'No results found'}
            </CommandEmpty>

            {data && data.length !== 0 ? (
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => {
                      onOpen(item.url);
                    }}
                    nested={item.type !== 'page'}
                  >
                    {
                      {
                        text: <TextIcon />,
                        heading: <HashIcon />,
                        page: <FileTextIcon />,
                      }[item.type]
                    }
                    <p className="w-0 flex-1 truncate">{item.content}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </>
        ) : null}
        {props.children}
      </CommandList>
      {props.footer}
    </CommandDialog>
  );
}
