import Header from './Header'
import Main from './Main'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}

export default Layout
