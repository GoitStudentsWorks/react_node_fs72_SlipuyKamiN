import ItemNotCocktails from 'components/FavoritePage/ItemNotCocktails';
// import Paginator from 'components/FavoritePage/Paginator';
import RecipesList from 'components/MyRecipesPage/RecipesList';
import LoadingSpinner from 'components/Shared/LoadingSpinner';
import Container from 'components/Shared/Container';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetMyRecipesQuery,
  useDeleteMyRecipeMutation,
} from 'redux/myRecipesSlice';
import scss from './FavoritePage.module.scss';
import MainTitle from 'components/Shared/MainTitle';

const MyRecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowDimensions();
  const limit = width >= 1440 ? 9 : 8;
  const { data, isLoading, isError } = useGetMyRecipesQuery(
    `?page=${searchParams.get('page')}&limit=${limit}`
  );
  const [toggleFavorite] = useDeleteMyRecipeMutation();
  const pagesQty = Math.ceil(data?.length === 0 ? 1 : data?.length / limit);
  const title = 'My recipes';

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
      return;
    }
  }, [searchParams, setSearchParams]);

  if (isLoading) return <LoadingSpinner />;

  const removeFavorite = id => {
    toggleFavorite(id)
      .unwrap()
      .then(() => {
        if (pagesQty === 1) return;

        if (data.length === 1) {
          setSearchParams({ page: pagesQty - 1 });
        }
      });
  };

  console.log("pagesQty", pagesQty);
  
  
  return (
    <section className={scss.wraper}>
      <Container>
        <MainTitle title={title} style={{ padding: '0' }} />
        {(data.length > 0) && !isError ? (
          <>
            <RecipesList data={data} removeFavorite={removeFavorite} />
            {/* <Paginator pagesQty={pagesQty} /> */}
          </>
        ) : (
          <ItemNotCocktails title={title} />
        )}
      </Container>
    </section>
  );
};

export default MyRecipesPage;

