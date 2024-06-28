import React from 'react';
import { Helmet } from 'react-helmet';

const Layout = ({children, description, keywords, author, title}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
            </Helmet>
            <main>
                {children}
            </main>
        </div>
    )
}

Layout.defaultProps = {
    title: "Authentication System",
    description: "OIBSIP Project",
    keywords: "React, MongoDb, JavaScript",
    author: "Saptak Sarkar"
}

export default Layout;