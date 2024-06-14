import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from './config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

// A U T H O R I Z A T I O N    I S    H A N D L E D    F R O M    W I T H I N    T H E    F I R E B A S E
// T O    C H A N G E    T H E    P R E V I L E G E S,    C H A N G E    F I R E B A S E    R U L E S . . .

// Anyone can view the list of movies.
// Only logged-in users can add a new movie.
// Only the user who added a movie can update or delete that movie.

function App() {

  const [movieList, setMovieList] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(0);
  const [newOscars, setNewOscars] = useState(false);
  
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = getDocs(collection(db, 'movies'));
      // console.log(data);

      const movieData = (await data).docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))        
      setMovieList(movieData);
      // console.log(movieData)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMovieList();
  }, [])

  const createMovie = async () => {
    try {
      await addDoc(collection(db,'movies'), {
        title: newTitle,
        releaseDate: newDate,
        receivedOscars: newOscars,
        userId: auth?.currentUser?.uid
      })
      getMovieList();

    } catch (error) {
      console.log(error)
    }
  }
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db,'movies', id);
      await deleteDoc(movieDoc);
      getMovieList();

    } catch (error) {
      console.log(error)
    }
  }
  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db,'movies', id);
      await updateDoc(movieDoc, {title: newTitle});
      getMovieList();

    } catch (error) {
      console.log(error)
    }
  }
  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      console.log(`File Uploaded by ${auth?.currentUser?.email}`)
    } catch (error) {
      console.log(error)
    }

  }
  

  return (
    <>
      <div className='app'>
        <Auth/>

        <div className='movie-crud'>
          <input type="text" placeholder='Movie Name...' onChange={(e)=> setNewTitle(e.target.value)}/>
          <input type="number" placeholder='Release Date...' onChange={(e)=> setNewDate(Number(e.target.value))}/>
          <input type="checkbox" checked={newOscars} onChange={(e)=> setNewOscars(e.target.checked)}/>  
          <label htmlFor="">Received Oscars</label>
          <button onClick={createMovie}>Create Movie</button>
        </div>

        <div className='movie-list'>
          <h1>Movie List</h1>      
            {
              movieList && 
              movieList.map((movie) => 
              <div>
                <h2 style={{color:movie.receivedOscars? 'green': 'red', margin:'1px'}}>{movie.title}</h2> 
                <p style={{margin:'1px'}}>{movie.releaseDate}</p>         
                <button style={{margin:'1px', color:'red'}} onClick={()=>deleteMovie(movie.id)}>Delete</button>
                <input type="text" placeholder='Update title' onChange={(e)=>setNewTitle(e.target.value)}/> 
                <button style={{margin:'1px'}} onClick={()=>updateMovie(movie.id)}>Edit</button>
              </div>
            )}
          </div>

          <div>
            <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
            <button onClick={uploadFile}>Upload File</button>
          </div>
      </div>
      
    </>
  )
}

export default App
