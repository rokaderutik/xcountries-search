import styles from './Countries.module.css'
import { useState, useEffect, useMemo } from 'react';

const Card = ({ image, title }) => {

    return (
        <div className={styles.countryCard}>
            <img src={image} alt={title} />
            <p>{title}</p>
        </div>
    );
};

const Countries = () => {
    const [searchData, setSearchData] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [currentCountryList, setCurrentCountryList] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            setCountryList(data)
            setCurrentCountryList(data);
        })
        .catch((error) => console.error('Error :',error))
    }, []);

    function findCurrentList(searchStr) {
        return countryList.filter((country) => country.name.common.toLowerCase().includes(searchStr));
    }

    // const currentSearchList = useMemo(
    //     () => findCurrentList(searchData.toLowerCase()),
    //     [searchData]
    // );
    // setCurrentCountryList(currentSearchList);

    function handleChange(e) {
        setSearchData(e.target.value);

        const searchStr = e.target.value.toLowerCase();

        const currentSearchList = findCurrentList(searchStr);
        
        setCurrentCountryList(currentSearchList);
        
    }

    return (
        <div>
            <div className={styles.inputDiv}>
                <input 
                    type='text'
                    value={searchData}
                    placeholder='Search for countries'
                    onChange={handleChange}
                />
            </div>
            <hr />
            <div className={styles.cardContainer}>
                {
                    currentCountryList.map((country) => {
                        return <Card 
                            key={country.name.common}
                            title={country.name.common}
                            image={country.flags.png}
                        />
                    })
                }
                
            </div>
        </div>
    );
};

export default Countries;