import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import { loginUser } from '../../actions/user';
import type { ConnectedProps } from 'react-redux';
import type { FunctionComponent } from 'react';


const connector = connect(null, { loginUser });


const Login: FunctionComponent<ConnectedProps<typeof connector>> = ({ loginUser }) => {
    const [form, updateForm] = useState<any>({
        email: '',
        password: ''
    });

    return (
        <Box direction="row">
            <Box direction="column" fill="horizontal"/>
            <Box 
                className="rounded-border"
                direction="column" 
                pad="xsmall" 
                background="light-1" 
                fill="horizontal"
            >
                <Heading level={3} alignSelf="start">Login</Heading>
                <Form className="login-form">
                    <FormField label="Name">
                        <TextInput
                            value={form.email} 
                            onChange={({ target: { value }}) => updateForm({...form, email: value})}
                        />
                    </FormField>
                    <FormField label="Password">
                        <TextInput 
                            type="password"
                            value={form.password}
                            onChange={({ target: { value }}) => updateForm({...form, password: value})}
                        />
                    </FormField>
                    <Box direction="row" margin={{top: "30px"}} gap="medium">
                        <Button 
                            type="submit" 
                            primary 
                            onClick={() => loginUser(form.email, form.password)}
                            label="Submit" />
                            <Text
                                weight={200}
                                size="xsmall"
                                alignSelf="end"
                            >Not a member? <Link to="/signup"> click here</Link></Text>
                    </Box>
                </Form>
            </Box>
            <Box direction="column" pad="small" fill="horizontal"/>
        </Box>
    )
};


export default connector(Login);
