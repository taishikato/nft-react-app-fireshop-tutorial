import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";

import FiredGuys from "../artifacts/contracts/MyNft.sol/FiredGuys.json";
import { useEffect, useState } from "react";
const contractAddress = "YOUE CONTRACT";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i} getCount={getCount} />
          </div>
        ))}
    </div>
  );
};

export default Home;

const NFTImage = ({ tokenId, getCount }: any) => {
  const contentId = "";
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const;

  return <div>NFTImage</div>;
};
