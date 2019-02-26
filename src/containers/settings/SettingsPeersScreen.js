import React, {Component} from 'react'
import { Clipboard } from 'react-native'

import { Container, Body, Content, Header, ListItem, Left, Right, Icon, Title, Button, Separator, Text, StyleProvider } from "native-base";

import getTheme from '../../../native-base-theme/components'
import variables from '../../../native-base-theme/variables/variables'

import { observer, inject } from 'mobx-react'

@inject('saito', 'saitoStore')
@observer
export default class SettingsPeersScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      header: (
        <StyleProvider style={getTheme(variables)} >
          <Header >
            <Left style={{flex: 1}}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Title>
                Peers
              </Title>
            </Body>
            <Right style={{flex: 1}}>
              <Icon style={{color: 'white'}} name={"clipboard"} onPress={() => Clipboard.setString(this.returnPeerEndpoint())}/>
            </Right>
          </Header>
        </StyleProvider>
      )
    }
  }

  returnPeerEndpoint() {
    let {protocol, host, port} = this.props.saito.network.peers[0].peer.endpoint
    return `${protocol}://${host}:${port}`
  }

  render() {
    let {protocol, host, port} = this.props.saito.network.peers[0].peer.endpoint
    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
          <Content>
            <ListItem>
              <Text>Protocol</Text>
                <Text note style={{marginLeft: 13, overflow: 'hidden' }}>
                  {protocol}
                </Text>
              <Right style={{flex: 1}}>
              </Right>
            </ListItem>
            <ListItem onPress={() => alert(this.props.saito.wallet.returnPrivateKey())}>
                <Text>Host</Text>
                <Text note password={true} style={{marginLeft: 10, overflow: 'hidden' }}>
                  {host}
                </Text>
              <Right style={{flex:1}}>
              </Right>
            </ListItem>
            <ListItem last>
                <Text>Identifier</Text>
                <Text note style={{marginLeft: 20, overflow: 'hidden'}}>
                  {port}
                </Text>
              <Right style={{flex: 1}}>
              </Right>
            </ListItem>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}