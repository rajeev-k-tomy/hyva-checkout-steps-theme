import { useContext } from 'react';
import StepContext from '../context/StepContext';

export default function useStepContext() {
  return useContext(StepContext);
}
