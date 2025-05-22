import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

jest.mock('@supabase/auth-helpers-react', () => ({
  useUser: () => ({
    user: null,
    isLoading: false,
  }),
}))

describe('Home', () => {
  it('renders the welcome message', () => {
    render(<Home featuredPosts={[]} />)
    
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument()
    expect(screen.getByText(/BlogMegX/i)).toBeInTheDocument()
  })

  it('displays the start writing button', () => {
    render(<Home featuredPosts={[]} />)
    
    expect(screen.getByText(/Start Writing/i)).toBeInTheDocument()
  })
})