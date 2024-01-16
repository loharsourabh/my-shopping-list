import { Asterisk } from '@phosphor-icons/react';

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;
type Props = BaseProps & {
  label?: string;
};

export default function AppInput({ label, ...props }: Props) {
  return label ? (
    <label className='flex w-full flex-col gap-1'>
      <span className='flex gap-1 items-center'>
        {label}{' '}
        {props.required && (
          <Asterisk
            size='0.65rem'
            weight='bold'
            className='text-red-700'
          />
        )}
      </span>
      <Input {...props} />
    </label>
  ) : (
    <Input {...props} />
  );
}

function Input(props: BaseProps) {
  return (
    <input
      {...props}
      className='block w-full rounded-md border border-neutral-400 bg-neutral-200 px-2 py-1 focus:border-blue-600 focus:outline-none'
    />
  );
}
