import useAppContext from '../../../hook/useAppContext';

export default function useCheckoutFormAppContext() {
  const {
    pageLoader,
    appDispatch,
    setPageLoader,
    fetchCountryStates,
    storeAggregatedAppStates,
  } = useAppContext();

  return {
    pageLoader,
    appDispatch,
    setPageLoader,
    fetchCountryStates,
    storeAggregatedAppStates,
  };
}
