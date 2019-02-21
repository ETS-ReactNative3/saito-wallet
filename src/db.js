import axios from 'axios'
import {AsyncStorage} from 'react-native'

async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(`@SaitoWallet:${key}`, value)
  } catch (error) {
    console.log(error)
  }
}

async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(`@SaitoWallet:${key}`);
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)
  }
}

async function loadOptions() {
  var data = await this.getData('options')
  if (data) {
    console.log(this)
    this.app.options = JSON.parse(data);
  }
}

async function saveOptions() {
  if (this.app) {
    if (this.app.options) {
      await this.storeData('options', JSON.stringify(this.app.options))
    }
  }
}

async function resetOptions() {
  debugger
  var peer = this.app.options.peers[0]
  if (this.app.network.peers[0]) {
    peer = this.app.network.peers[0].peer.endpoint ? this.app.network.peers[0].peer.endpoint : this.app.network.peers[0].peer
  }
  var {protocol, host, port} = peer

  let tmpdate = new Date().getTime();
  let loadurl = `/options?x=${tmpdate}`;

  try {
    await AsyncStorage.removeItem(`@SaitoWallet:options`)
    var response = await axios.get(`${protocol}://${host}:${port}${loadurl}`)
    this.app.options = response.data
  } catch(err) {
    console.log(err.message)
  }
}

export default { storeData, getData, loadOptions, saveOptions, resetOptions }