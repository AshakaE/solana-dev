import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import 'dotenv/config'
import {
    airdropIfRequired,
    getKeypairFromEnvironment,
} from '@solana-developers/helpers'

const suppliedPubKey = process.argv[2] || null

if (!suppliedPubKey) {
    console.log('Please provide a public key for the transaction')
    process.exit(1)
}

const sendKeypair = getKeypairFromEnvironment('SECRET_KEY')

console.log(`supplied public key: ${suppliedPubKey}`)

const toPubKey = new PublicKey(suppliedPubKey)
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

await airdropIfRequired(
    connection,
    sendKeypair.publicKey,
    5 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
)

console.log(
    `✅ Loaded our own keypair, the destination pub key, and the connected to solana`,
)

const transaction = new Transaction()

const LAMPORTS_TO_SEND = 70000000
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sendKeypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND,
})

transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [
    sendKeypair,
])

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubKey}`)
console.log(`Transaction signature is ${signature}!`)
