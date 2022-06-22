import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Categories } from '../components/Categories'
import { Sort, list } from '../components/Sort'
import { PizzaBlock } from '../components/PizzaBlock'
import { Placeholder } from '../components/Placeholder'
import { Pagination } from '../components/Pagination'
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice'
import { selectFilters } from '../redux/slices/filterSlice'
import { useEffect, useRef } from 'react';
import qs from 'qs';
import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store'

type SearchPizzaParams = {
  sortProperty: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

const Home = () => {

  // const { searchValue } = useContext(AppContext)
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilters)

  const dispatch = useAppDispatch()

  const { items, status } = useSelector(selectPizzas)


  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // If was the first render and params were changed
  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sortType.sortProperty,
        currentPage,
      }
      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  // If was the first then check URl-params and dispatch them to store
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sortType = list.find((obj) => obj.sortProperty === params.sortProperty);
      if (sortType) {
        dispatch(
          setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sortType,
          }),
        );
      }


      isSearch.current = true;
    }

  }, []);

  // Get data from the server
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {

      dispatch(fetchPizzas({ sortType, categoryId, currentPage, searchValue }))
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort value={sortType} onChangeSort={(obj) => dispatch(setSortType(obj))} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error"
        ? (
          <div className="content__error-info">
            <h2>Error</h2>
            <p>Please try to open the page later.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading"
              ? [...new Array(9)].map((_, index) =>
                <Placeholder key={index}
                />
              )
              : items.map((obj) => (
                <Link
                  to={`/pizza/${obj.id}`}
                  key={obj.id}
                >
                  <PizzaBlock
                    {...obj}
                  />
                </Link>

              ))}
          </div>)}

      <Pagination currentPage={currentPage} onClickPage={(page: number) => dispatch(setCurrentPage(page))} />
    </>
  )
}

export default Home