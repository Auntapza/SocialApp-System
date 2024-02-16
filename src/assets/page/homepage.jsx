import { useEffect, useState } from 'react'
import Post from '../component/post'


let homepage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/PHP/NetxApi/allpost.php')
        .then(res => res.json())
        .then(data => {
            setData(data)
        })
    }, [])

    return (
        <>
            <div className="content">
                <div className="container">
                <h2>Welcome User</h2>
                <p>There are <b>{data.length}</b> Post avalable</p>
                </div>
            </div>

            <div className="post">
                <div className="container">
                    {data.map((item, index) => (
                        <Post data={item} key={index}/>
                    ))}
                </div>
            </div>
        </>
    )

}

export default homepage