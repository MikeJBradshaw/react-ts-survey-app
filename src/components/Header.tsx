import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import { Avatar, Box, Button, Heading, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../store';


const connector = connect(
    ({app: { user }}: RootState) => ({ user }),
    { logoutUser }
);


const Header: FunctionComponent<ConnectedProps<typeof connector>> = ({ user, logoutUser }) => {
    const navigate = useNavigate();
    const handleClick = (url: string) => { navigate(url); }

    return (
        <Box 
            gridArea="header"
            background="lightblue"
            pad="small"
            direction="row"
            justify="between"
        >
            <Box gap="small" direction="row">
                <Avatar src="https://ui-avatars.com/api/?name=survey+app&background=random&color=fff" />
                <Heading 
                    className="grommet-app-heading"
                    margin="none" 
                    level="3"><Text size="xxlarge" weight="lighter">Survey App</Text></Heading>
            </Box>
            <Box direction="row" gap="medium">
                { user && <Button secondary color="light-3" onClick={() => logoutUser()} icon={<Logout />} /> }
                { !user && <Button onClick={() => handleClick('/signup')}><Text size="medium" weight="lighter">Sign Up</Text></Button>}
                { !user && <Button onClick={() => handleClick('/login')}><Text size="medium" weight="lighter">Log In</Text></Button>}
            </Box>
        </Box>
    )
};


export default connector(Header);
