import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Text, View} from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <ActivityIndicator size="large" color="#0000ff" />
);

export default class App extends Component{
  constructor (props) {
    super(props)
      this.state = {
        loading: false,
        name: '',
        qr_value: '',
        date_time: '',
        isSending: false,
        view: "undone",
        status: true
      }
    }
    scanBarcode(e){
      this.setState({
        status:e,
        date_time: new Date().toDateString()
      })
    }
    handleEmail = () => {
      this.setState({isSending: true})
      const body = {
        Name: this.state.name,
        DateTime: this.state.date_time,
        QR_Code: this.state.qr_value
      }
      console.log(body)
      const url = 'http://192.168.43.172:8080/api/index.php';
      let fetchData = { 
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      fetch(url, fetchData)
      .then((res)  => {
        if(res){
          alert("Email sent !")
        }else{
          alert("Email sending failed !")
        }
        this.setState({
          isSending: false,
          view: "done"
        })
      })
      .catch((error) => {
        console.error(error)
      });
    }
    renderEnterName (){
      let disable = this.state.name !== "" && this.state.name.length >= 3 ? false : true 
        return (
          <View style={styles.name} >
            <Text
            style={styles.text}
            >Enter Your Name</Text>
            <TextInput 
            style={styles.textInput}
            autoFocus={true}
            onChangeText={(name) => this.setState({name})}
            ></TextInput>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity 
                onPress={() => this.scanBarcode(disable)} 
                style={styles.btn}
                disabled = {disable}                  
                >
                <Text style={[{ fontSize: 18 },styles.btnTxt]}> SCAN QR CODE </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
    renderLoading () {
      return (
        <View 
        style = {{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    renderSendTo(){
      return (
        <View style={styles.container} >
          <Text  style={styles.text}  >Your Name:</Text>
          <TextInput  style={styles.textInputt} value = {this.state.name} />
          <Text  style={styles.text} >Date / Time:</Text>
          <TextInput  style={styles.textInputt} value = {this.state.date_time} />
          <Text  style={styles.text} >QR Value:</Text>
          <TextInput  style={styles.textInputt} value = {this.state.qr_value} secureTextEntry = {true} />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.onBack()} style={styles.btnB}>
              <Text style={[{ fontSize: 18, fontWeight: 'bold', color: 'white' },styles.btnBack]}> BACK </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.handleEmail()}  style={styles.btn} >
              <Text style={[{ fontSize: 18 },styles.btnTxt]}> SEND </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    onBack(){ 
      this.setState({
        status:true,
        name: '',
        qr_value: '',
        date_time: ''
      })
    }
    done(){
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <Text>Done</Text>
        </View>
      )
    }
    render() {
      return (
        <View style={styles.container}>
        {this.state.view === "done" ? this.done() 
          : (this.state.isSending === true  ? this.renderLoading()
            : ( this.state.status === true
              ? this.renderEnterName()
                : this.state.qr_value === ""
                  ? <RNCamera
                      style={styles.preview}
                      type={RNCamera.Constants.Type.back}
                      flashMode={RNCamera.Constants.FlashMode.on}
                      permissionDialogTitle={'Permission to use camera'}
                      permissionDialogMessage={'We need your permission to use your camera phone'}
                      onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        this.setState({qr_value : barcodes[0].data});}} >
                      {({status}) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.onBack()} style={styles.back}>
                              <Text style={{ fontSize: 14, color: 'white' }}> BACK </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    </RNCamera>
                  : this.renderSendTo()
              )
            )
          }
        </View>
      );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  qr_view: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  name: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 100,
  },
  qr_name:{
    width: '90%',
    height: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 15,
  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#F5FCFF',
    height: 30,
    fontSize: 25,
    color: 'gray',
  },
  textInput:{
    width: '90%',
    height: 50,
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    padding: 5,
    fontSize: 30,
    color: '#576157',
    borderRadius: 10,
    alignSelf: 'center',
  },
  textInputt:{
    width: '90%',
    height: 50,
    backgroundColor: '#F5FCFF',
    padding: 5,
    fontSize: 30,
    color: '#576157',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#33D619',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  back: {
    flex: 0,
    backgroundColor: '#DC1D17',
    borderRadius: 5,
    color: '#ffffff',
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btn: {
    flex: 0,
    backgroundColor: '#1DBD10',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btnB: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btnTxt: {
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  btnBack: {
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});