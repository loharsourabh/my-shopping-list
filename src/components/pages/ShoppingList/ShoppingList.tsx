import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import AppButton from '../../reusables/AppButton';
import AppInput from '../../reusables/AppInput';
import PopupModal from '../../reusables/PopupModal';
import AppDropdown from '../../reusables/AppDropdown';
import ItemList from './ItemList';

export default function ShoppingList() {
  const types = ['- Select a type -', 'Grocery', 'Home Goods', 'Hardware'];
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [listName, setListName] = useState('');
  const [selectedType, setSelectedType] = useState(types[0]);

  // list of items with name (currently '') and quantity to render. Initially rendering just one.
  const [itemList, setItemList] = useState([
    { id: 1, name: '', quantity: '1' },
  ]);

  function changeItem(index: number, key: string, value: string) {
    // map returns a new array
    setItemList(prevState =>
      prevState.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        }

        return item;
      }),
    );
  }

  function addNewItem() {
    setItemList([
      ...itemList,
      {
        // id for the new item
        id:
          itemList.reduce(
            (acc, value) => (acc > value.id ? acc : value.id),
            0,
          ) + 1,
        name: '',
        quantity: '1',
      },
    ]);
  }

  function changeOrder(oldIndex: number, newIndex: number) {
    const orderedList = [...itemList];

    // move element from oldIndex to newIndex
    orderedList.splice(newIndex, 0, orderedList.splice(oldIndex, 1)[0]);
    setItemList(orderedList);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowSavedPopup(true);
  }

  return (
    <>
      <form
        onSubmit={submitForm}
        className='mx-auto my-4 flex h-screen max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-4xl flex-col rounded-md border border-black p-4'
      >
        <div className='mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col [&_>_.sortableList]:min-h-0 [&_>_.sortableList]:overflow-auto'>
          <h1 className='mb-4 text-xl font-medium'>My Shopping List</h1>
          <div className='mb-4 flex justify-between gap-4'>
            <span className='w-56'>
              <AppInput
                required
                id='list-name'
                placeholder='Type list name'
                label='List Name'
                value={listName}
                onChange={event => setListName(event.target.value)}
              />
            </span>
            <span className='w-56'>
              <AppDropdown
                required
                id='list-type'
                label='Type'
                value={selectedType}
                onChange={event => setSelectedType(event.target.value)}
                options={types}
                placeholderOption={types[0]}
              />
            </span>
          </div>

          <AppButton onClick={addNewItem} type='button'>
            <Plus size={'1rem'} weight='bold' className='mr-2' />
            <span>Add an item</span>
          </AppButton>

          {/* Rendering items list */}
          <ItemList
            itemList={itemList}
            onItemChange={changeItem}
            onItemDelete={index =>
              setItemList(prevState => prevState.filter((_, i) => i !== index))
            }
            onOrderChange={changeOrder}
          />
        </div>
        <div className='-mx-4 -mb-4 mt-4 flex justify-end gap-4 rounded-b-md bg-neutral-100 p-2 [@media(max-width:550px)]:justify-center'>
          <span className='w-24'>
            <AppButton type='submit' disabled={itemList.length === 0}>
              Save
            </AppButton>
          </span>
          <span className='w-24'>
            {/* non functional button */}
            <AppButton type='button' variant='white'>
              Cancel
            </AppButton>
          </span>
        </div>
      </form>

      {/* success popup */}
      {showSavedPopup && (
        <PopupModal
          message='Shopping List Saved!'
          onClose={() => setShowSavedPopup(false)}
        />
      )}
    </>
  );
}
