import { v4 as uuidv4 } from "uuid";
import { verifySignature } from "../utilities/crypto-lib.mjs";
import { REWARD_ADDRESS, MINING_REWARD } from "../config/settings.mjs";

export default class Transaction {
  constructor({sender, recipient, amount, inputMap, outputMap}) {
    this.id = uuidv4().replaceAll("-", "");
    this.outputMap = outputMap || this.createOutputMap({sender, recipient, amount});
    this.inputMap = inputMap || this.createInputMap({sender, outputMap: this.outputMap});
  };

  static transactionReward({miner}) {
    return new this({
      inputMap: REWARD_ADDRESS,
      outputMap: {[miner.publicKey]: MINING_REWARD},
    });
  };

  static validate(transaction) {
    const {inputMap: {address, amount, signature}, outputMap} = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, amount) => total + amount
    );

    if (amount !== outputTotal) return false;

    if (!verifySignature({publicKey: address, data: outputMap, signature}))
      return false;

    return true;
  };

  update({sender, recipient, amount}) {
    if (amount > this.outputMap[sender.publicKey])
      throw new Error("Amount exceeds your current balance!");

      if (!this.outputMap[recipient]) {
        this.outputMap[recipient] = amount;
      } else {
        this.outputMap[recipient] = this.outputMap[recipient] + amount;
      }

    this.outputMap[sender.publicKey] = this.outputMap[sender.publicKey] - amount;

    this.inputMap = this.createInputMap({sender, outputMap: this.outputMap});
  };

  createOutputMap({sender, recipient, amount}) {
    const outputMap = {};

    outputMap[recipient] = amount;
    outputMap[sender.publicKey] = sender.balance - amount;

    return outputMap;
  };

  createInputMap({sender, outputMap}) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap)
    };
  };
}