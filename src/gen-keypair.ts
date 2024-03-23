import { Keypair } from '@solana/web3.js';
import "dotenv/config"
// import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const { publicKey, secretKey }= Keypair.generate();

console.log(`The secret key is: `, publicKey.toBase58());

console.log(`The secret key is: `, secretKey);

// console.log(`✅ Generated keypair!`);
// const keypair = getKeypairFromEnvironment('SECRET_KEY');

// console.log(`✅ Finished! We've loaded out secret key securely, using an env file!`) ;

