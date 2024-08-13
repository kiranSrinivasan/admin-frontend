import React, { useState, useEffect } from 'react';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [link, setLink] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/news');
            const data = await response.json();
            setNewsItems(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addNews = async () => {
        if (!title || !image || !link || !date) {
            alert('Please fill out all fields and choose an image.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (e) {
            const imgURL = e.target.result;
            const newNews = {
                title,
                imgURL,
                link,
                date
            };

            try {
                const response = await fetch('http://localhost:5000/api/news', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newNews),
                });
                const result = await response.json();
                setNewsItems([...newsItems, result]);

                // Clear the form fields
                setTitle('');
                setImage(null);
                setLink('');
                setDate('');
            } catch (error) {
                console.error('Error adding news:', error);
            }
        };
        reader.readAsDataURL(image);
    };

    const deleteNews = async (id, index) => {
        try {
            await fetch(`http://localhost:5000/api/news/${id}`, {
                method: 'DELETE',
            });
            setNewsItems(newsItems.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const viewNews = (newsItem) => {
        alert(`Title: ${newsItem.title}\nImage URL: ${newsItem.imgURL}\nLink: ${newsItem.link}\nDate: ${newsItem.date}`);
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

                    .container {
                        width: 90%;
                        margin: 20px auto;
                        background-color: #444;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    }

                    h1 {
                        text-align: center;
                        color: #0f9d58;
                    }

                    .form-box {
                        background-color: #555;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }

                    .form-box input[type="text"],
                    .form-box input[type="file"],
                    .form-box input[type="date"] {
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

                    .image-preview {
                        max-width: 100px;
                        height: auto;
                    }

                    .action-btn {
                        padding: 5px 10px;
                        border: none;
                        border-radius: 4px;
                        color: #fff;
                        cursor: pointer;
                        font-size: 14px;
                    }

                    .view-btn {
                        background-color: #2196F3;
                    }

                    .delete-btn {
                        background-color: #f44336;
                    }

                    .view-btn:hover {
                        background-color: #1976D2;
                    }

                    .delete-btn:hover {
                        background-color: #e53935;
                    }
                `}
            </style>
            <div className="container">
                <h1>View News</h1>
                <div className="form-box">
                    <h2>Add News</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                    <input
                        type="text"
                        value={link}
                        placeholder="Enter link"
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button onClick={addNews}>Add News</button>
                </div>
                <table id="newsTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>News Image</th>
                            <th>Link</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsItems.map((newsItem, index) => (
                            <tr key={index}>
                                <td>{newsItem.title}</td>
                                <td><img src={newsItem.imgURL} className="image-preview" alt="News" /></td>
                                <td><a href={newsItem.link} target="_blank" rel="noopener noreferrer">{newsItem.link}</a></td>
                                <td>{newsItem.date}</td>
                                <td>
                                    <button className="view-btn" onClick={() => viewNews(newsItem)}>View</button>
                                    <button className="delete-btn" onClick={() => deleteNews(newsItem.id, index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default News;
