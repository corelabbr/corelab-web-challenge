import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <Main />
    </QueryClientProvider>
  )
}

export default App;
