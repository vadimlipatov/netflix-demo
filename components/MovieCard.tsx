import clsx from 'clsx';
import { MovieInterface } from '@/types';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MovieCardImage = ({
  id,
  className,
  thumbnailUrl,
}: {
  id: string;
  className: string;
  thumbnailUrl: string;
}) => {
  const router = useRouter();
  const redirectToWatch = useCallback(() => router.push(`/watch/${id}`), [router, id]);

  return (
    <img
      onClick={redirectToWatch}
      src={thumbnailUrl}
      alt="Movie"
      draggable={false}
      className={clsx(
        'cursor-pointer object-cover transition duration shadow-xl w-full h-[12vw]',
        className
      )}
    />
  );
};

const MovieCardActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const redirectToWatch = useCallback(() => router.push(`/watch/${id}`), [router, id]);
  const { openModal } = useInfoModalStore();

  return (
    <div className="flex flex-row items-center gap-3">
      <div
        onClick={redirectToWatch}
        className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
      >
        <PlayIcon className="text-black w-4 lg:w-6" />
      </div>
      <FavoriteButton movieId={id} />
      <div
        onClick={() => openModal(id)}
        className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      >
        <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
      </div>
    </div>
  );
};

const MovieCardDescription = ({ duration, genre }: { duration: string; genre: string }) => {
  return (
    <>
      <p className="text-green-400 font-semibold mt-4">
        New <span className="text-white">2023</span>
      </p>
      <div className="flex flex-row mt-4 gap-2 items-center">
        <p className="text-white text-[10px] lg:text-sm">{duration}</p>
      </div>
      <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
        <p>{genre}</p>
      </div>
    </>
  );
};

const MovieCard = ({ data }: { data: MovieInterface }) => {
  return (
    <div className="group bg-zinc-900 col-span relative">
      <MovieCardImage
        className="rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
        {...data}
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <MovieCardImage className="rounded-t-md" {...data} />
        <div className="z-10 bg-zinc-800  p-2 lg:p-4  absolute w-full transition shadow-md rounded-b-md">
          <MovieCardActions {...data} />
          <MovieCardDescription {...data} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
