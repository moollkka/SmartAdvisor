import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  screen: {
    flex: 1,
    padding: 16,
  },
  
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  
  textSecondary: {
    fontSize: 14,
    color: '#666666',
  },
  
  textSmall: {
    fontSize: 12,
    color: '#999999',
  },
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
  
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  
  ml8: { marginLeft: 8 },
  ml16: { marginLeft: 16 },
  
  mr8: { marginRight: 8 },
  mr16: { marginRight: 16 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  p24: { padding: 24 },
  
  pt8: { paddingTop: 8 },
  pt16: { paddingTop: 16 },
  
  pb8: { paddingBottom: 8 },
  pb16: { paddingBottom: 16 },
  
  pl8: { paddingLeft: 8 },
  pl16: { paddingLeft: 16 },
  
  pr8: { paddingRight: 8 },
  pr16: { paddingRight: 16 },
});