import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          status: 'ok',
          items: ['Configurar Docker', 'Automatizar CI', 'Publicar no GHCR'],
        }),
    })
  ) as jest.Mock
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('Home page', () => {
  it('renderiza o titulo de status', () => {
    render(<Home />)
    expect(screen.getByText('Status da aplicação')).toBeInTheDocument()
  })
})