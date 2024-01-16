import { useEffect, useRef } from 'react';
import { List, MinusCircle } from '@phosphor-icons/react';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';
import AppInput from '../../reusables/AppInput';
import AppDropdown from '../../reusables/AppDropdown';

type Props = {
  itemList: Item[];
  onItemChange(index: number, key: string, value: string): void;
  onItemDelete(index: number): void;
  onOrderChange(oldIndex: number, newIndex: number): void;
};

type Item = {
  id: number;
  name: string;
  quantity: string;
};

export default function ItemList({
  itemList,
  onItemChange,
  onItemDelete,
  onOrderChange,
}: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  // item being dragged loses its quantity because of the way react-easy-sort works.
  // the mutation observer will correct that behavior.
  useEffect(() => {
    const list = listRef.current!;
    if (!list) return;

    const observer = new MutationObserver(records => {
      for (const record of records) {
        const listItem = record.addedNodes[0] as HTMLLIElement;

        if (listItem?.classList.contains('dragged')) {
          const draggedSelectElem = listItem.querySelector('select')!;
          const originalSelectElem: HTMLSelectElement = list.querySelector(
            'li[style*="opacity: 0"] select',
          )!;

          draggedSelectElem.value = originalSelectElem.value;

          break;
        }
      }
    });

    observer.observe(list, { childList: true });

    return () => observer.disconnect();
  }, []);

  return itemList.length > 0 ? (
    <>
      <div className='my-4 gap-4 rounded-md bg-neutral-400 px-4 py-2 font-medium'>
        <div className='mx-auto flex max-w-[550px] justify-between'>
          <span>Item Name</span>
          <span>Quantity</span>
        </div>
      </div>

      {/* react-easy-sort library */}
      <SortableList
        allowDrag={itemList.length > 1}
        onSortEnd={onOrderChange}
        draggedItemClassName='dragged'
        className='sortableList'
        customHolderRef={listRef}
        lockAxis='y'
      >
        <ol ref={listRef} className='block space-y-4'>
          {itemList.map((item, index) => (
            <SortableItem key={item.id}>
              <li className='block bg-white'>
                <div className='flex items-center gap-4 rounded-md border border-black px-3 py-2'>
                  <SortableKnob>
                    <List
                      size='1.25rem'
                      className='flex-shrink-0 cursor-grab'
                    />
                  </SortableKnob>

                  <AppInput
                    required
                    placeholder='Item name'
                    value={item.name}
                    onChange={event =>
                      onItemChange(index, 'name', event.target.value)
                    }
                  />

                  <AppDropdown
                    value={item.quantity}
                    onChange={event =>
                      onItemChange(index, 'quantity', event.target.value)
                    }
                    options={Array.from({ length: 12 }, (_, i) => `${i + 1}`)}
                  />

                  <button title='Delete Item' type='button'>
                    <MinusCircle
                      size='1.5rem'
                      weight='fill'
                      className='cursor-pointer text-red-700'
                      onClick={() => onItemDelete(index)}
                    />
                  </button>
                </div>
              </li>
            </SortableItem>
          ))}
        </ol>
      </SortableList>
    </>
  ) : (
    <h2 className='mt-8 text-center'>No items in your shopping list.</h2>
  );
}
