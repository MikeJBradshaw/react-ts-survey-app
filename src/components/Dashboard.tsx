import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    Spinner,
    Tag,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHeader,
    Text
} from 'grommet';
import { AddCircle, Close } from 'grommet-icons';
import { init }  from '../actions/dashboard';
import type { FunctionComponent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../store';


const connector = connect(
    ({db: { loading, surveys }}: RootState) => ({ loading, surveys }),
    { init }
);


const Dashboard: FunctionComponent<ConnectedProps<typeof connector>> = ({ loading, surveys, init }) => {
    useEffect(() => {
        init();
    }, []);

    const navigate = useNavigate();
    const handleCreateNewSurvey = () => { navigate('/survey/create'); }

    if (loading) { 
        return (<Spinner size="xlarge" />);
    }

    if (!surveys || surveys.length === 0) {
        return (<Box><Text>Create a new survey now</Text></Box>);
    }

    return (
        <Box direction="row">
            <Box direction="column" fill="horizontal" pad="xlarge">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" border="bottom">Title</TableCell>
                            <TableCell scope="col" border="bottom">Status</TableCell>
                            <TableCell scope="col" border="bottom">Created</TableCell>
                            <TableCell scope="col" border="bottom">Tags</TableCell>
                            <TableCell scope="col" border="bottom">Actions</TableCell>
                            <TableCell scope="col" border="bottom">
                                <Button 
                                    icon={<AddCircle color="green" />}
                                    onClick={() => handleCreateNewSurvey()} />
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {surveys.map((survey, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell><Text weight={400}>{ survey.title }</Text></TableCell>
                                    <TableCell><Text weight={200}>{ survey.status.toUpperCase() }</Text></TableCell>
                                    <TableCell><Text weight={200}>{ survey.created }</Text></TableCell>
                                    <TableCell>
                                        <Box direction="row" gap="xsmall">
                                            { survey.restricted && <Tag value="Restricted"/> }
                                            { survey.expires && <Tag value="Restricted"/> }
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box direction="row" gap="xsmall">
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box direction="row" gap="xsmall">
                                            <Button icon={<Close color="red" size="medium"/>}/>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};


export default connector(Dashboard);
