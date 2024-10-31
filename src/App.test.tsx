import {render} from '@testing-library/react';
import App from './App'
import '@testing-library/jest-dom'

test('renders Vite + React', () =>{
  const {getByText} = render(<App />);
  const h1Elem = getByText(/Vite \+ React/i)
  expect(h1Elem).toBeInTheDocument();
})