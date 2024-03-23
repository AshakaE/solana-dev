import { resolve } from '@bonfida/spl-name-service'
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from '@solana/web3.js'

// const connection = new Connection(clusterApiUrl('devnet'));
// const address = new PublicKey('DFwqnH8vM74SJM2a2VoxsXfWnTNXRcxntpkZL6TEXoqE');
// const balance = await connection.getBalance(address);
// const balanceInSol = balance / LAMPORTS_PER_SOL;

const suppliedPubKey = process.argv[2]

if (!suppliedPubKey) {
    throw new Error('Please provide a public key!')
}

try {
    PublicKey.isOnCurve(suppliedPubKey)
} catch (error) {
    console.error(`========${error}`)
}
const solAdd = suppliedPubKey.includes('.sol')

const api = solAdd ? 'mainnet-beta' : 'devnet'

try {
    const connection = new Connection(clusterApiUrl(api))
    let publicKey: PublicKey
    if (solAdd) {
        const owner = await resolve(connection, suppliedPubKey.split('.sol')[0])
        publicKey = new PublicKey(owner.toBase58())
        console.log(owner.toBase58())
    } else {
        publicKey = new PublicKey(suppliedPubKey)
    }

    const balanceInLamports = await connection.getBalance(publicKey)

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

    console.log(
        `The balance of wallet address ${publicKey} is ${balanceInSOL} SOL`,
    )
} catch (e) {
    console.log(suppliedPubKey, suppliedPubKey.length)
    console.error(e)
}
