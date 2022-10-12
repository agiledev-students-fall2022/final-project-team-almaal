import React, { useState } from 'react'
import styles from './Friends.module.css'
import { Typography } from 'antd'
import { Input, Space, Card } from 'antd';
const { Title } = Typography


const { Search } = Input;

const Friends = () => {
    const [searchItem, setItem] = useState('');

    return (
        <div className={styles.container}>
            <Title className={styles.title}>Adding a Friend</Title>
            <Search className={styles.search} placeholder="input search text" onChange={(event) => setItem(event.target.value)} />
            {
                searchItem !== '' && <Card className={styles.search}>
                    {[1, 2, 3].map(key => {
                        return <p key={key}> {searchItem} </p>;
                    })}
                </Card>
            }

        </div>
    )
}

export default Friends