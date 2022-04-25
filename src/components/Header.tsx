import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import { Avatar, Box, Button, Heading, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import { useNavigate, Link } from 'react-router-dom';
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
                { user && <Button primary color="light-3" onClick={() => logoutUser()} label="Log Out" icon={<Logout />} /> }
                { !user && <Button onClick={() => handleClick('/signup')}><Text size="medium" weight={100}>Sign Up</Text></Button>}
                { !user && <Button onClick={() => handleClick('/login')}><Text size="medium" weight={100}>Log In</Text></Button>}
                {/* { !user && <Link to="/login"> <Button><Text size="medium" weight={100}>Log In</Text></Button></Link>} */}
            </Box>
        </Box>
    )
};


export default connector(Header);
