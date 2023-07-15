import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from './redux/slice/data';
import Select from 'react-select';
import './App.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '20px', // Add padding around the entire page
  },
  table: {
    border: '2px solid',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    marginLeft: '20px',
    marginRight: '20px',
    borderCollapse: 'collapse',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  Button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '20px',
  },
  loader: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    background: `rgba(0, 0, 0, 0.834) url('https://www.hadecoration.gift/public/images/ajax-loader-green.gif') center no-repeat`,
    zIndex: 1,
  },
  highlightColumn: {
    backgroundColor: '#FFFF00',
  },
  searchContainer: {
    marginBottom: '10px', 
    marginRight: '20px',
    width: '500px'
  },
};

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedTitle, setSelectedTitle] = useState();

  const idArr = state.todo.data?.map((e) => e.id).slice(0, displayCount) || [];
  const titleArr =
    state.todo.data?.map((e) => e.title).slice(0, displayCount) || [];
  const completedArr =
    state.todo.data?.map((e) => e.completed.toString()).slice(0, displayCount) ||
    [];

  if (state.todo.isLoading) {
    return <div style={styles.loader}></div>;
  }

  const handleShowMore = () => {
    setDisplayCount(displayCount + 10);
  };

  const optionsForTitle = titleArr.map((name) => ({
    value: name,
    label: name,
  }));

  const handleSelectedTitle = (selectedOption) => {
    setSelectedTitle(selectedOption.label);
  };

  return (
    <div className="App">
      <button style={styles.Button} onClick={(e) => dispatch(fetchTodo())}>
        Fetch Data
      </button>
      <div style={styles.container}>
      <div style={styles.searchContainer}>
          <label htmlFor="storeName">Search Title...</label>
          <Select
            closeMenuOnSelect
            isMulti={false}
            options={optionsForTitle}
            value={optionsForTitle.find(
              (option) => option.value === selectedTitle
            )}
            onChange={handleSelectedTitle}
          />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <td style={styles.td}>ID</td>
              <td style={styles.td}>Title</td>
              <td style={styles.td}>Completed</td>
            </tr>
          </thead>
          <tbody>
            {idArr.map((val, key) => (
              <tr
                key={key}
                style={
                  titleArr[key] === selectedTitle
                    ? styles.highlightColumn
                    : {}
                }
              >
                <td style={styles.td}>{val}</td>
                <td style={styles.td}>{titleArr[key]}</td>
                <td style={styles.td}>{completedArr[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {displayCount < state.todo.data?.length && (
        <button
          className="show-more-button"
          style={styles.Button}
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default App;
