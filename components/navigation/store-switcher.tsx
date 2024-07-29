"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

type StoreProps = {
  value: string;
  label: string;
};

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  // 가게 등록 모달 훅
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 데이터를 Select Input 에서 쓸 수 있도록 가공하는 코드
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  // 현재 가게를 찾는 코드
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  );

  // 가게 선택 시 수행되는 함수
  const onStoreSelect = (store: StoreProps) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role={"combobox"}
          aria-expanded={isOpen}
          aria-label="가게를 선택하세요."
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 size-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="검색" />
            <CommandEmpty>검색된 스토어가 없습니다.</CommandEmpty>
            <CommandGroup heading="스토어 목록">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  className="text-sm"
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className="mr-2 size-4" />

                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 size-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
