import { Avatar } from '../avatar';

export const HeaderAvatar = ({
  src,
  username,
}: {
  src: string;
  username: string;
}) => {
  return (
    <div className='flex-center overflow-hidden gap-4 max-w-[137px]'>
      <Avatar src={src} alt={username ?? 'user-avatar'} />
      <p className='hidden md:block text-lg-semibold truncate text-white'>
        {username}
      </p>
    </div>
  );
};
