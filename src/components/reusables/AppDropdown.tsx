import { Asterisk } from '@phosphor-icons/react';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
  label?: string;
  placeholderOption?: string;
};

export default function AppDropdown(props: Props) {
  return props.label ? (
    <label className='flex w-full flex-col gap-1'>
      <span>
        <span className='flex items-center gap-1'>
          {props.label}{' '}
          {props.required && (
            <Asterisk size='0.65rem' weight='bold' className='text-red-700' />
          )}
        </span>
      </span>
      <Select {...props} />
    </label>
  ) : (
    <Select {...props} />
  );
}

function Select({ options, placeholderOption, ...props }: Props) {

  return (
    <select
      {...props}
      className='block w-full rounded-md border border-neutral-400 bg-neutral-200 px-2 py-1'
    >
      {options.map(option => (
        <option key={option} value={option === placeholderOption ? '' : option}>
          {option}
        </option>
      ))}
    </select>
  );
}
