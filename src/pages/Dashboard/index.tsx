import styles from './Dashboard.module.scss';
import { FiltersDropdown, Header } from '../../components';
import Note from '../../components/Note';
import NoteCreationForm from '../../components/NoteCreationForm';
import { useEffect, useState } from 'react';
import { useTodoStore } from '../../store';
import { shallow } from 'zustand/shallow';

const Dashboard = () => {
  const fetchTodos = useTodoStore((state) => state.getTodos);
  const [emptyTodosMessage, setEmptyTodosMessage] = useState('Carregando notas...');
  const favoritedTodos = useTodoStore(
    (state) => state.displayedTodos.filter((todo) => todo.is_favorite),
    shallow
  );
  const otherTodos = useTodoStore(
    (state) => state.displayedTodos.filter((todo) => !todo.is_favorite),
    shallow
  );

  useEffect(() => {
    const fn = async () => {
      await fetchTodos();
      if (favoritedTodos.length === 0 && otherTodos.length === 0) {
        setEmptyTodosMessage('Você ainda não possui nenhuma nota');
      } else {
        setEmptyTodosMessage('');
      }
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className={styles.Main}>
        <>
          <FiltersDropdown />
          <section className={styles.sections}>
            <NoteCreationForm />
            {favoritedTodos.length > 0 ? (
              <>
                <span>Favoritas</span>
                <div className={styles.gridContainer}>
                  {favoritedTodos.map((todo) => (
                    <Note
                      title={todo.title}
                      content={todo.content}
                      color={todo.color}
                      id={todo.id}
                      key={todo.id}
                      is_favorite={todo.is_favorite}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>
          <section className={styles.sections}>
            {otherTodos.length > 0 ? (
              <>
                <span>Outras</span>
                <div className={styles.gridContainer}>
                  {otherTodos.map((todo) => (
                    <Note
                      title={todo.title}
                      content={todo.content}
                      color={todo.color}
                      id={todo.id}
                      key={todo.id}
                      is_favorite={todo.is_favorite}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>
          {favoritedTodos.length === 0 && otherTodos.length === 0 && (
            <section>
              <p className={styles.noNotesMessage}>{emptyTodosMessage}</p>
            </section>
          )}
        </>
      </main>
    </>
  );
};

export default Dashboard;
