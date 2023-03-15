var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')

const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/awjLIt9kn2vJM6PynkmDbkfi6sZAA1Zv')
);

router.post('/rewards', async (req, res) => {
  try {
    const {
      address,
      rewards
    } = req.body

    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.ADMIN_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);
    // Creating the transaction object
    const tx = {
      from: signer.address,
      to: address,
      value: web3.utils.toWei(`${rewards}`),
    };
    // Assigning the right amount of gas
    tx.gas = await web3.eth.estimateGas(tx);

    // Sending the transaction to the network
    const receipt = await web3.eth
      .sendTransaction(tx)
      .once("transactionHash", (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`Transaction hash: ${txhash}`);
        if (txhash) res.status(200).json({ message: 'Payment successful' })
      });

  } catch (err) {
    console.log(err);
    res.status(503).send({message:err.message})
  }
});



module.exports = router
