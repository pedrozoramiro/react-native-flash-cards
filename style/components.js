import styled from 'styled-components/native'

export const TitleText = styled.Text`
  font-size: 30;
  text-align: center;
`
export const SubTitleText = styled.Text`
  font-size: 20;
  text-align: center;
  color: gray;
  color: gray;
`

export const SimpleTouchableOpacity = styled.TouchableOpacity`
  height:100;
  align-items: center;
  border-width: 1;
  border-color: black;
  
  margin-left: 10;
  margin-right:10;
  margin-top: 10;
  padding-left: 10;
  padding-right:10;
  padding-top: 10;
`


export const ContainerView = styled.View`
flex: 1;
flex-direction: column;
align-items: stretch;
justify-content:space-around;

`

export const ItemView = styled.View`

`


export const SimpleTextInput = styled.TextInput`
height: 80;
font-size: 15;
border-color: gray; 
border-width: 1;
`

export const ShadowView = styled.View`
  border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
  margin-left: 5;
  margin-right: 5;
  margin-top: 10;
`