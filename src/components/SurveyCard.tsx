import type { FunctionComponent } from 'react';


interface SurveyCardProps {
    id: string;
    status: string;
    title: string;
    restricted: boolean;
    expires: boolean;
    created: Date;
}


const SurveyCard: FunctionComponent<SurveyCardProps> = ({ id, status, title, restricted, expires, created }) => {
    return(
        <>SurveyCard</>
    );
};


export default SurveyCard;
