import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function ArticleAdmin() {

    const [article, setArticle] = useState({
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        categoryId: '',
        userId: '',
        content: ''
    });

    return (
        <div className="article-admin">
            <Form>
                <input id="article-id" type="hidden" name="article-id" value={article.id}/>
            </Form>
        </div>
    );
};

export default ArticleAdmin;