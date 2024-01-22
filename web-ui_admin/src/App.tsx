import BackgroundColorLayout from "./components/BackgroundColorLayout";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "../src/components/AuthContext";

function App() {

  return (
    <BackgroundColorLayout>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BackgroundColorLayout>
  );
}

export default App;
