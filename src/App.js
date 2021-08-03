import {useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import NoteList from './components/NoteList'
import Search from './components/Search'
import Header from './components/Header'

const App = () => {

  const [notes, setNotes] = useState([
  {
    id:nanoid(),
    text:'To succeed, we must first believe that we can - Michael Korda',
    date:'26/06/21',
  },
   {
    id:nanoid(),
    text:'You have to believe in Yourself - SunTzu',
    date:'26/06/21',
  },
   {
    id:nanoid(),
    text:'It s more important to know where you are going than, to get there quickly',
    date:'26/06/21',
  },

    ]);


const [searchText , setSearchText] = useState('')
const [darkMode , setDarkMode] = useState(false)

useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);



  const addNote = (text) =>{
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes,newNote]
    setNotes(newNotes)

  }


const deleteNote = (id) =>{
  const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
}


  return (

    <div className={`${darkMode && 'dark-mode'}`}>
    <div className="container">
    <Header handleDarkMode={setDarkMode} />
    <Search handleSearchNote={setSearchText} />
      <NoteList notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText))}
      handleAddNote={addNote}  handleDeleteNote={deleteNote}/>
    </div>
    </div>
  );
}

export default App;
