import { useEffect, useRef, useState } from 'react';
import classes from './App.module.css';
import Header from './Header';
import MeaningSections from './MeaningSections';
import Word from './Word';
import searchIcon from './assets/icon-search.svg';
import openWindowIcon from './assets/icon-new-window.svg'

function App() {

  const [theme, setTheme] = useState('light');
  const [fontFilter, setFilter] = useState('Sans Serif');
  const inputWord = useRef('');
  const [isError, setError] = useState(false);
  const [word, setWord] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const noResultDiv = <div className={classes['no-result-div']}>
    <span className={classes['no-result-emoji']}>&#128533;</span>
    <p className={classes['no-result-primaryText']}>No Definitions Found</p>
    <p className={classes['no-result-secondaryText']}>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
  </div>

  const initialNoResultDiv = <div className={classes['no-result-div']}>
    <span className={classes['no-result-emoji']}>&#128075;</span>
    <p className={classes['no-result-primaryText']}>Start Searching</p>
    <p className={classes['no-result-secondaryText']}>Start exploring the fascinating world of words and their meanings. Enter a word to begin your search!</p>
  </div>

  useEffect(() => {
    getWordDefinition(word);
  }, [word]);

  function onToggleTheme() {
    setTheme((prevTheme) => { return prevTheme == 'light' ? 'dark' : 'light' })
  }

  async function getWordDefinition(word) {
    if(word != '')
    {
      setLoading(true);
      var url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      const resp = await fetch(url);
      const result = await resp.json();
      setResult(result);
      setLoading(false);
    }
    
  }

  function onInputKeyPress(e){
    if (e.key === "Enter") {
      onSearch();
    }
    else{
      setError(prevState => { return prevState && false })
    }
  }

  function onSearch() {
    var i = inputWord.current.value;
    if (i.trim() != '') {
      setWord(i);
    }
    else{
      setError(true)
    }
  }

  return (
    <div className={classes['parent-div']} theme={theme} font={fontFilter}>
      <Header onToggleTheme={onToggleTheme} setFilter={setFilter}/>
      <div className={`${classes['search-div']} ${isError ? classes.error : ''}`}>
        <input type='text' placeholder='Search for any word...' ref={inputWord} onKeyDown={onInputKeyPress}/>
        <img id={classes.searchIcon} src={searchIcon} onClick={onSearch}/>
      </div>
      {isError ? <span id={classes.invalidText}>Whoops, can’t be empty…</span>: null}

      {
        result.length > 0 && word != '' ?
          <div className={classes['results-div']}>
            <Word word={result[0]["word"]} phonetics={result[0]["phonetics"]} />
            {
              result[0].meanings.map((meaning, index) => (
                <MeaningSections key={index} meanings={meaning} />
              ))
            }
            <div style={{ width: '100%', height: 0.5, backgroundColor: '#979797', opacity: 0.3, marginTop: 32 }} />
            <div className={classes['source-div']}>
              <span>Source</span>
              <a href={result[0].sourceUrls[0]} target='_blanks'>{result[0].sourceUrls[0]} <img src={openWindowIcon} /></a>
              
            </div>
          </div> : word != '' && !isLoading ? noResultDiv : initialNoResultDiv
      }

    </div>
  );
}

export default App;
