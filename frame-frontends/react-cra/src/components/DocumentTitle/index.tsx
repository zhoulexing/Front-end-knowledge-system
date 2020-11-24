import React, { useEffect } from "react";

interface DocumentTitleProps {
    title: string;
}

const DocumentTitle: React.FC<DocumentTitleProps> = (props) => {
    const { children, title } = props;

    useEffect(() => {
        document.title = title;
    }, [title]);

    return <>{children}</>;
};

export default DocumentTitle;
