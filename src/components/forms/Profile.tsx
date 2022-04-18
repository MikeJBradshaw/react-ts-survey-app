import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Heading, Form, FormField, Select, TextInput, Text } from 'grommet';
import { createUser } from '../../actions/user';
import { countryList } from '../../const';
import type { FunctionComponent } from 'react';
import type { ConnectedProps } from 'react-redux';


const connector = connect(null, { createUser }); // action


const validForm = (userForm: { password: string, confirm: string, country: string, state: string, first: string, last: string }) => {
    if (!(userForm.password || userForm.confirm)) {
        return false;
    }

    if (userForm.password.length < 12) {
        return false;
    }

    if (userForm.password !== userForm.confirm) {
        return false;
    }

    if (userForm.country === 'United States') {
        if (!userForm.state) {
            return false;
        }
    }

    if (userForm.first.length < 2 || userForm.last.length < 2) {
        return false;
    }
    return true;
}


const Profile: FunctionComponent<ConnectedProps<typeof connector>> = ({ createUser }) => {
    const [userForm, updateForm] = useState<any>({
        email: '',
        password: '',
        confirm: '',
        first: '',
        last: '',
        country: '',
        state: '',
        sex: ''
    });

    return (
        <Box direction="row">
            <Box direction="column" fill="horizontal" />
            <Box
                className="rounded-border"
                direction="column"
                pad="xsmall"
                background="light-1"
                fill="horizontal"
            >
                <Heading className="form-title" level={3} alignSelf="start">Create new account</Heading>
                <Form className="signup-form">
                    <FormField label="Email">
                        <TextInput
                            value={userForm.email}
                            onChange={({target: { value }}) => updateForm({ ...userForm, email: value })}
                        />
                    </FormField>
                    <FormField label="Password">
                        <TextInput
                            value={userForm.password}
                            onChange={({target: { value }}) => updateForm({ ...userForm, password: value })}
                            type="password"
                        />
                    </FormField>
                    <FormField label="Confirm Password">
                        <TextInput
                            value={userForm.confirm}
                            onChange={({target: { value }}) => updateForm({ ...userForm, confirm: value })}
                            type="password"
                        />
                    </FormField>
                    <FormField label="First Name">
                        <TextInput
                            value={userForm.first}
                            onChange={({target: { value }}) => updateForm({ ...userForm, first: value })}
                        />
                    </FormField>
                    <FormField label="Last Name">
                        <TextInput
                            value={userForm.last}
                            onChange={({target: { value }}) => updateForm({ ...userForm, last: value })}
                        />
                    </FormField>
                    <FormField label="Gender">
                        <Select
                            options={['Male', 'Female', 'Other']}
                            value={userForm.gender}
                            onChange={({target: { value }}) => updateForm({ ...userForm, gender: value })}
                        />
                    </FormField>
                    <FormField label="Country">
                        <Select
                            options={countryList}
                            value={userForm.country}
                            onChange={({target: { value }}) => updateForm({ ...userForm, country: value })}
                        />
                    </FormField>
                    <FormField label="State">
                        <TextInput
                            disabled={userForm.country !== 'United States'}
                            value={userForm.state}
                            onChange={({target: { value }}) => updateForm({ ...userForm, state: value })}
                        />
                    </FormField>

                    <Box direction="row" margin={{top: "30px"}} gap="medium">
                        <Button 
                            type="submit" 
                            disabled={!validForm(userForm)}
                            primary 
                            onClick={() => createUser(userForm)}
                            label="Submit" />
                            <Text
                                weight={200}
                                size="xsmall"
                                alignSelf="end"
                            >Member already? <Link to="/login"> click here</Link></Text>
                    </Box>
                </Form>
            </Box>
            <Box direction="column" fill="horizontal" />
        </Box>
    );
};


export default connector(Profile);
