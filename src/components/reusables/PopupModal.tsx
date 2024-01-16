import AppButton from './AppButton';

type Props = {
  message: string;
  onClose(): void;
};

export default function PopupModal({ message, onClose }: Props) {
  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 backdrop-blur-[6px]'>
      <div className='rounded-md bg-white p-8'>
        <h2 className='mb-8 font-medium'>{message}</h2>
        <AppButton onClick={() => onClose()}>Okay</AppButton>
      </div>
    </div>
  );
}
