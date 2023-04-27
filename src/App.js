import './App.css';
import Login from './pages/Login/Login.js';
import EntryRoute from './routes/app.routes';
import { Provider } from 'react-redux';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <EntryRoute/>
    </Provider>
  );
}

export default App;
