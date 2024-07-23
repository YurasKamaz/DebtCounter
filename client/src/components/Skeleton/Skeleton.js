import React from 'react'
import styles from './styles.module.css'


const Skeleton = ({count = 3}) => {
    return(
        <>
            <ul className={styles.list}>
                {[...Array(count)].map((_, index) => 
                    <li key={index} className={styles.item}></li>
                )}
            </ul>
        </>
    )
}

export default Skeleton