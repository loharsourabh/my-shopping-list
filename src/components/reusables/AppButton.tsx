type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'blue' | 'white';
};

export default function AppButton({ children, variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        variant === 'white'
          ? `flex w-full items-center justify-center rounded-md border-[2px] border-black p-2 disabled:border-neutral-500 disabled:bg-neutral-300`
          : `flex w-full items-center justify-center rounded-md border-[2px] border-blue-800 bg-blue-800 p-2 text-white disabled:border-neutral-500 disabled:bg-neutral-500`
      }
    >
      {children}
    </button>
  );
}
