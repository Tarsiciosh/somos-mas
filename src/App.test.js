import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import Index from './components/home/Index'


import { useParams } from 'react-router'
import { ActivitiesForm } from './components/activities/ActivitiesForm'
import { getActivity, createActivity, updateActivity } from './services/activities'

jest.mock('react-router')
//jest.mock('./services/activities')


test('renders loading message', async () => {
  useParams.mockReturnValue({id: "759"})
    
  /*
  getActivity.mockResolvedValue({
    data: {
      data: {
        id: "759",
        name: "Nombre",
        description: "Descripcion",
        imageData: "http://ongapi.alkemy.org/storage/dSeMTTvaWu.png"
      }
    }
  })*/

  render(<ActivitiesForm/>)

  const label = screen.getByText(/cargando/i)
  expect(label).toHaveTextContent('cargando')
})


/*


  const { getByText } = render(
    <Provider store={store}>
      <ActivitiesForm />
    </Provider>
  );

  expect(getByText(/hola/i)).toBeInTheDocument();

const mockGetActivity = jest.fn()
jest.mock('./services/activities', () => {
  return jest.fn().mockImplementation (() => {
    return {getActivity: mockGetActivity}
  })
})

*/
