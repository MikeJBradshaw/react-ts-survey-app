import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Box, Grid, Grommet, Spinner } from 'grommet';
import { init } from './actions/app';
import type { FunctionComponent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from './store';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/forms/Login';
import Profile from './components/forms/Profile';
import Survey from './components/forms/Survey';
import './App.css';


const theme = {
    global: {
        font: {
            family: 'Helvetica',
            size: '20px',
            height: '24px',
            weight: "800"
        },
    },
};


const connector = connect(
    ({app: { loading, user }}: RootState) => ({ loading, user }),
    { init }
); // state as fun that returns dict{ }); // action is a dict of actions


const App: FunctionComponent<ConnectedProps<typeof connector>> = ({ loading, user, init }) => {
    useEffect(() => {
        init();
    }, []);

    
    return (
        <Grommet theme={theme}>
                <Grid
                    rows={['auto', 'auto']}
                    columns={['auto', 'auto']}
                    gap="medium"
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'main', start: [0, 1], end: [1, 1] },
                    ]}
                >
                    <Router>
                        <Header />
                        <Box 
                            gridArea="main" 
                            // background="light-5"
                        >
                            <Routes>
                                {!user && <Route path="/" element={<Landing />} />}
                                {!user && <Route path="/signup" element={<Profile />} />}
                                {!user && <Route path="/login" element={<Login />} />}
                                {user &&<Route path="/" element={<Dashboard />} />}
                                {user &&<Route path="/survey/create" element={<Survey />} />}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Box>
                    </Router>
                </Grid>
        </Grommet>
    ); 
};


export default connector(App);
