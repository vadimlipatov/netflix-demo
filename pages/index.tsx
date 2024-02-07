import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
// import Navbar from '@/components/Navbar';
// import Billboard from '@/components/Billboard';
// import MovieList from '@/components/MovieList';
// import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/auth', permanent: false } };
  return { props: {} };
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <div className="flex justify-between p-6">
        <h1 className="text-white text-center text-4xl">Home page</h1>
        <button className="text-white px-4 py-2 border rounded-md" onClick={() => signOut()}>
          logout
        </button>
      </div>
      <p className="text-white text-center mt-8 w-5/6 mx-auto">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident eaque
        repellendus beatae tenetur aspernatur dignissimos sapiente rerum quia excepturi cum adipisci
        qui molestias, dolorum consequatur? Laboriosam autem enim cupiditate officiis officia sit
        fugiat? Neque cumque aspernatur ratione ab repellendus beatae id libero tempora repudiandae
        reiciendis eligendi consequuntur architecto eius soluta odio consectetur culpa nam minus
        magnam excepturi, alias dolore dolorum.
      </p>

      {/* <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div> */}
    </>
  );
};

export default Home;
