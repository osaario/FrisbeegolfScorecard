/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

class fribagolf extends Component {
    constructor(props) {
        super(props);
        this.state =  this.initialState();
    }
    initialState() {
        let holes = [];
        for(let i = 0; i < 18; i++) {
            holes.push(i);
        }
        const data = holes.map((p) => [3, 0,0,0,0]);
        const players = ['Tauski', 'Fredi', 'Reetu', 'Matti']
        return {data, players};
    }
    clearData() {
        console.log(this);
        this.setState(this.initialState());
    }
    clearRow(colClicked, rowClicked) {
        const newData = this.state.data[rowClicked][colClicked] = 0;
        this.setState({data: newData});
    }
    setPlayerName(newName, editIdx) {
        const newPlayers = this.state.players.map((player, idx) => {
            return idx == editIdx ? newName : player;
        });
        this.setState({players: newPlayers});
    }
    rowClick(colClicked, rowClicked) {
        const currentValue = this.state.data[rowClicked][colClicked];
        this.state.data[rowClicked][colClicked] = currentValue < 99 ? currentValue + 1 : 0;
        this.setState({data: this.state.data});
    }
    render() {
        const colSums = this.state.data.map((row) => {
            //set 0 rows to par
            const rowPar = row[0];
            return row.map((val) => {
                return val == 0 ? rowPar : val;
            });
        }).reduce((agg, row) => {
            if(!agg) return row;
            else  {
                return agg.map((val, idx) => {
                    return  val + row[idx];
                });
            }
        });
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch'}}>
                    <TouchableOpacity style={styles.headerRowWhite} onLongPress={this.clearData.bind(this)}>
                        <Text>HOLE</Text>
                    </TouchableOpacity>
                    <View style={styles.headerRow}>
                        <Text>PAR</Text>
                    </View>
                    {
                        this.state.players.map((player, idx) => {
                            return (
                                <View key={'player' + idx.toString()} style={styles.headerRowWhite}>
                                    <TextInput
                                        style={{height: 40, marginLeft: 8, fontSize: 12, alignItems: 'center'}}
                                        value={player}
                                        onChangeText={(text) => this.setPlayerName(text, idx)}
                                        />
                                </View>
                            );
                        })

                    }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch'}}>
                    <View style={styles.headerRow}>
                    </View>
                    <View style={styles.headerRow}>
                    </View>
                    {
                        this.state.players.map((player, idx) => {
                            return (
                                <View key={player + idx.toString() + 'head'} style={styles.headerRow}>
                                    <Text>{colSums[idx + 1] - colSums[0]}</Text>
                                </View>
                            );
                        })

                    }
                </View>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={{flex: 1, alignSelf: 'stretch'}}>
                    <View>
                    {

                        this.state.data.map((colData, row) => {
                            const rowPar = colData[0];
                            const textStyle = {fontSize: 20}
                            const styleForScore = (score) => {
                                let style;
                                if(score == rowPar) {
                                    style = {color: 'green'};
                                } else if(score < rowPar - 1) {
                                    style = {color: 'purple'};
                                } else if(score < rowPar) {
                                    style = {color: 'blue'};
                                } else if(score < rowPar + 2) {
                                    style = {color: 'orange'};
                                } else {
                                    style = {color: 'red'};
                                }
                                return {...style, ...textStyle}
                            }
                            return (
                                <View key={row} style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={styles.firstRow}>
                                        <Text style={textStyle}>{row + 1}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.numberRow} onLongPress={() => this.clearRow(0, row)} onPress={() => this.rowClick(0, row)}>
                                        <Text style={textStyle}>{rowPar}</Text>
                                    </TouchableOpacity>
                                    {
                                        this.state.players.map((player, idx) => {
                                            const pIdx = idx + 1;
                                            return (
                                                <TouchableOpacity key={player + idx.toString() + row.toString()} style={styles.numberRow} onLongPress={() => this.clearRow(pIdx, row)}  onPress={() => this.rowClick(pIdx, row)}>
                                                    <Text style={styleForScore(colData[pIdx])}>{colData[pIdx] > 0 ? colData[pIdx] : ''}</Text>
                                                </TouchableOpacity>
                                            );
                                        })

                                    }
                                </View>
                            );
                        })
                    }
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerRowWhite: {flex: 1,backgroundColor: '#FFF', height: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#eee', borderStyle: 'solid'},
    headerRow: {flex: 1,backgroundColor: '#FAFAFA', height: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#eee', borderStyle: 'solid'},
    firstRow: {flex: 1,backgroundColor: '#FAFAFA', height: 60, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#eee', borderStyle: 'solid'},
    numberRow: {flex: 1, height: 60, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#eee', borderStyle: 'solid', backgroundColor: '#fff'},
  container: {
    flex: 1,
    marginTop:22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('fribagolf', () => fribagolf);
