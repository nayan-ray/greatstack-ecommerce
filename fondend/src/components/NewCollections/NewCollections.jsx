import React, { useEffect, useState } from 'react';
import './NewCollections.css';

import Item1 from '../Item/Item1';

const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);
  useEffect(()=>{
      fetch("http://localhost:4000/newcollection")
      .then(res => res.json())
      .then(data => setNew_collection(data))
  }, [])
  return (
    <div className='new-collections'>
         <h1>NEW COLLECTIONS</h1>
         <hr />
         <div className="collections">
              {new_collections.map((item,i)=>{
                  return <Item1 key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
              })}
         </div>
    </div>
  )
}

export default NewCollections;
