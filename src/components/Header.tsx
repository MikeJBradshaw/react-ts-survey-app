import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import { Avatar, Box, Button, Heading } from 'grommet';
import { Logout } from 'grommet-icons';
import type { FunctionComponent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../store';


const connector = connect(
    ({app: { user }}: RootState) => ({ user }),
    { logoutUser }
);


const Header: FunctionComponent<ConnectedProps<typeof connector>> = ({ user, logoutUser }) => {
    return (
        <Box 
            gridArea="header"
            background="orange"
            pad="small"
            direction="row" 
            justify="between"
        >
            <Box direction="row" gap="small">
                <Avatar src="https://ui-avatars.com/api/?name=survey+app&background=random&color=fff" />
                <Heading 
                    className="grommet-app-heading"
                    margin="none" 
                    level="3">Survey App</Heading>
            </Box>
            { user && <Button secondary color="light-3" onClick={() => logoutUser()} icon={<Logout />} /> }
            {/* { !user && <><Button primary label="Signup" color="light-3" onClick={() => logoutUser()}/></> } */}
        </Box>
    )
};


export default connector(Header);
