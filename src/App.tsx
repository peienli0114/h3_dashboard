import './App.css';
import { Box } from '@mui/material';  
import MapApp from './components/chart_map';
import PeopleList from './components/choose_data';
import FormComponent from './components/form';

function App() {
  return (
  // <Box sx={{ 
  //   textAlign: 'center', 
  //   backgroundColor: 'rgb(179, 199, 211)', 
  //   color: 'white', 
  //   height: '100vh', 
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center', 
  //   justifyContent: 'center' }}>

  //   <Box
  //    sx={{
  //     height: '800px',
  //     width:'90vw',
  //     marginTop:'100px'
  //    }}
  //   >
  //         <MapApp />
  //   </Box>

  //   <PeopleList />
  // </Box>
  <Box>
    <FormComponent />
  </Box>
  )
}

export default App;
