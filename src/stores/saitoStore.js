
import { observable, action } from 'mobx'

export default class SaitoStore {
  @observable balance = '0.0'
  @observable publickey = ''
  @observable identifier = ''
  @observable default_fee = 0.0


  constructor(saito) {
    this.balance = saito.wallet.wallet.balance
    this.publickey = saito.wallet.wallet.publickey
  }

  @action
  updateSaitoWallet(saito) {
    this.balance = saito.wallet.wallet.balance
    this.publickey = saito.wallet.wallet.publickey
    this.default_fee = saito.wallet.wallet.default_fee
  }

  saveIdentifierToWallet(saito, identifier) {
    this.identifier = identifier
    saito.wallet.wallet.identifier = identifier
  }
}