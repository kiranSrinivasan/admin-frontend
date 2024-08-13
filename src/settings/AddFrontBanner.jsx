import React, { useState } from 'react';

const AddFrontBanner = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [newsItems, setNewsItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadNews = () => {
        if (!title || !message || !file) {
            alert('Please fill out all fields and choose a file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imgURL = e.target.result;
            const newNews = {
                id: newsItems.length + 1,
                title,
                message,
                imgURL
            };
            setNewsItems([...newsItems, newNews]);
            setTitle('');
            setMessage('');
            setFile(null);
        };
        reader.readAsDataURL(file);
    };

    const deleteNews = (id) => {
        setNewsItems(newsItems.filter(news => news.id !== id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <div>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #333;
                    color: #fff;
                    margin: 0;
                    padding: 0;
                }

                .banner {
                    background-color: #444;
                    padding: 20px;
                    text-align: center;
                    color: #0f9d58;
                }

                .banner h1 {
                    margin: 0;
                }

                .container {
                    width: 90%;
                    margin: 20px auto;
                    background-color: #444;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }

                .form-box {
                    background-color: #555;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                .form-box input[type="text"],
                .form-box textarea,
                .form-box input[type="file"] {
                    width: calc(100% - 20px);
                    padding: 10px;
                    margin-bottom: 10px;
                    border: none;
                    border-radius: 4px;
                    background-color: #666;
                    color: #fff;
                }

                .form-box button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    background-color: #0f9d58;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }

                .form-box button:hover {
                    background-color: #0e8c4e;
                }

                .table-container {
                    margin-top: 20px;
                }

                .search-box {
                    margin-bottom: 10px;
                    text-align: right;
                }

                .search-box input[type="text"] {
                    padding: 8px;
                    border: none;
                    border-radius: 4px;
                    background-color: #666;
                    color: #fff;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                table, th, td {
                    border: 1px solid #555;
                }

                th, td {
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background-color: #666;
                }

                tr:nth-child(even) {
                    background-color: #555;
                }

                tr:nth-child(odd) {
                    background-color: #444;
                }

                .delete-btn {
                    background-color: #f44336;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .delete-btn:hover {
                    background-color: #e53935;
                }

                .image-preview {
                    max-width: 100px;
                    height: auto;
                }
                `}
            </style>

            <div className="banner">
                <h1>News Management System</h1>
            </div>

            <div className="container">
                <div className="form-box">
                    <h2>Add News</h2>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        rows="4"
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <button onClick={uploadNews}>Upload News</button>
                </div>

                <div className="table-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>SNO</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsItems
                                .filter(news =>
                                    news.title.toLowerCase().includes(searchTerm) ||
                                    news.message.toLowerCase().includes(searchTerm)
                                )
                                .map((news) => (
                                    <tr key={news.id}>
                                        <td>{news.id}</td>
                                        <td>{news.title}</td>
                                        <td>{news.message}</td>
                                        <td><img src={news.imgURL} className="image-preview" alt="News Image" /></td>
                                        <td>
                                            <button className="delete-btn" onClick={() => deleteNews(news.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddFrontBanner;
