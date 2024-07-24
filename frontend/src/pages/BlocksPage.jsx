import React, { useEffect, useState } from 'react'
import Block from '../components/Block';

export const BlocksPage = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
      loadBlocks();
    }, []);
  
    const loadBlocks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/blockchain');
  
        if (response.ok) {
          const result = await response.json();
          setBlocks(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className='blocks'>
        <h2 className='title'>Blocks</h2>
        {blocks.map((block) => (
          <Block className='block' key={block.hash} block={block} />
        ))}
      </div>
    );
}
