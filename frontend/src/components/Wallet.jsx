import { useEffect, useState } from 'react';
import { getBalance } from '../services/HttpClient';

function Wallet() {
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = async () => {
    try {
      const balance = await getBalance();
      setWalletInfo(balance.data);
    } catch (error) {
      console.log(error);
      window.alert("Could not get balance, please make sure server is online.")
    }
    
  };

  return (
    <div className="wallet-info">
      <div>Address: {walletInfo.address}</div>
      <div>Balance: {walletInfo.balance}</div>
    </div>
  );
}
export default Wallet;
