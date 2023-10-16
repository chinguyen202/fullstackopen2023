import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuotes } from './reducers/anecdoteReducer';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdotes from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotes.getAll().then((quotes) => dispatch(setQuotes(quotes)));
  }, []);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
