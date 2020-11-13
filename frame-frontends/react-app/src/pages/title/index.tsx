import React from 'react';
import DocumentTitle from '../../components/DocumentTitle/index';

const Title: React.FC = (props) => {
    document.title = 'title';
    return (
        <DocumentTitle title='test'>
            title
        </DocumentTitle>
    )
}

export default Title;