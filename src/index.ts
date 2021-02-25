import * as CryptoJs from "crypto-js"

interface BlockType {
  index: number;
  hash: string;
  previousHash: string;
  data: string;
  timestamp: number;
}
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number, 
    previousHash: string, 
    timestamp: number, 
    data: string
    ): string => CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
  
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
    ) {
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
    }
  }

  const genesisBlock: BlockType = new Block(0, "20320202020", "", "Hello", 123456);

  let blockchain: Block[] = [genesisBlock];

  const getLatestBlock = (): BlockType => blockchain[blockchain.length - 1];

  const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

  const getHashForBlock = (aBlock: BlockType): string => 
    Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

  const isBlockValid = (candidateBlock: BlockType, previousBlock: Block): Boolean => {
    if(previousBlock.index + 1 !== candidateBlock.index) return false;
    if(previousBlock.hash !== candidateBlock.previousHash) return false;
    if(getHashForBlock(candidateBlock) !== candidateBlock.hash) return false;

    return true;
  }

  const addBlock = (aBlock: Block): void => {
    if(isBlockValid(aBlock, getLatestBlock())) {

      blockchain.push(aBlock);
    }
  }

  const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);

    addBlock(newBlock);
    return newBlock;
  }

  createNewBlock("second Block");
  createNewBlock("third Block");
  createNewBlock("fourth Block");

  console.log(blockchain);