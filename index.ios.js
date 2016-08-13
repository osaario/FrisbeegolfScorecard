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
  Text,
  View
} from 'react-native';

class fribagolf extends Component {
    constructor(props) {
        super(props);
        let holes = [];
        for(let i = 0; i < 18; i++) {
            holes.push(i);
        }


        const data = holes.map((p) => [3, 0,0,0,0]);
        const players = ['Tauski', 'Fredi', 'Reetu', 'Matti']
        this.state = {
            data, players
        };

    }
    clearRow(colClicked, rowClicked) {
        const newData = this.state.data.map((row, rowIdx) => {
            return row.map((value, colIdx) => {
                if(colClicked == colIdx && rowClicked == rowIdx) {
                    return 0;
                }
                return value;
            });
        });
        this.setState({data: newData});
    }
    rowClick(colClicked, rowClicked) {
        const newData = this.state.data.map((row, rowIdx) => {
            return row.map((value, colIdx) => {
                if(colClicked == colIdx && rowClicked == rowIdx) {
                    return value < 99 ? value + 1 : 0;
                }
                return value;
            });
        });
        this.setState({data: newData});
    }
    render() {
        const colSums = this.state.data.map((row) => {
            //set 0 rows to par
            const rowPar = row[0];
            return row.map((val) => {
                return val == 0 ? rowPar : val;
            });
        }).reduce((agg, row) => {
            console.log(agg);
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
                    <View style={styles.headerRow}>
                        <Text>HOLE</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text>PAR</Text>
                    </View>
                    {
                        this.state.players.map((player, idx) => {
                            return (
                                <View style={styles.headerRow}>
                                    <Text>{player}</Text>
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
                    onScroll={() => { console.log('onScroll!'); }}
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
                                } else if(score < rowPar) {
                                    style = {color: 'blue'};
                                } else {
                                    style = {color: 'red'};
                                }
                                return {...style, ...textStyle}
                            }
                            return (
                                <View key={row} style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={styles.numberRow}>
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
    headerRow: {flex: 1,backgroundColor: '#FAFAFA', height: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#eee', borderStyle: 'solid'},
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
