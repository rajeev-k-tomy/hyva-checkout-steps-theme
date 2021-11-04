import useAppContext from '../../../../hook/useAppContext';

export default function useLoginAppContext() {
  const { setPageLoader } = useAppContext();

  return { setPageLoader };
}
